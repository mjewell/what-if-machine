import { partition } from 'lodash';
import { types } from 'mobx-state-tree';
import { generate } from 'shortid';

import { DateOnly } from '../utilities/DateOnly';
import { toRRule } from '../utilities/toRRule';
import { Category, ICategory } from './Category';
import { IRecurrence } from './Recurrence';

type IOccurrenceData = {
  [key: number]: number;
  before: number;
};

type ITotalData = {
  before: number;
  during: number;
  total: number;
};

const minDate = new Date('2000/01/01');

export const Transaction = types
  .model('Transaction', {
    id: types.optional(types.identifier(), generate),
    name: types.optional(types.string, ''),
    amountStr: types.optional(types.string, ''),
    // TODO: set this to TRecurrence when mobx state tree cache issue is fixed
    recurrence: types.optional(types.frozen, () => ({
      type: 'on',
      data: new DateOnly().dateTime
    })),
    category: types.reference(Category),
    position: types.refinement(types.number, n => n >= 0)
  })
  .views(self => ({
    get amount() {
      return +self.amountStr || 0;
    },
    get schedule() {
      return toRRule(self.recurrence);
    }
  }))
  .views(self => ({
    getOccurrencesArray(rangeEndDate: Date): Date[] {
      if (!self.schedule || !self.amount) {
        return [];
      }

      return self.schedule.between(
        self.recurrence.data.startDate || minDate,
        rangeEndDate,
        true
      );
    }
  }))
  .views(self => ({
    getOccurrences(startDate: Date, endDate: Date): IOccurrenceData {
      const occurrencesArray = self.getOccurrencesArray(endDate);

      const [occurrencesBefore, occurrencesAfter] = partition(
        occurrencesArray,
        occurrence => occurrence < startDate
      );

      return occurrencesAfter.reduce(
        (obj, occurrence) => ({
          ...obj,
          [occurrence.getTime()]: self.amount
        }),
        {
          before: occurrencesBefore.length * self.amount
        }
      );
    }
  }))
  .views(self => ({
    getTotals(startDate: Date, endDate: Date): ITotalData {
      const occurrences = self.getOccurrences(startDate, endDate);

      const during = Object.keys(occurrences)
        .filter(k => k !== 'before')
        .reduce((sum, time) => sum + occurrences[time], 0);

      return {
        before: occurrences.before,
        during,
        total: occurrences.before + during
      };
    }
  }))
  .actions(self => ({
    setName(name: string) {
      self.name = name;
    },
    setAmount(amount: string) {
      self.amountStr = amount;
    },
    setRecurrence(recurrence: IRecurrence) {
      self.recurrence = recurrence;
    },
    setPosition(position: number) {
      self.position = position;
    },
    setCategoryAndPosition(category: ICategory, position: number) {
      if (category === self.category) {
        if (self.position < position) {
          category.transactions
            .slice(self.position + 1, position + 1)
            .forEach(t => {
              t.setPosition(t.position - 1);
            });
        } else {
          category.transactions.slice(position, self.position).forEach(t => {
            t.setPosition(t.position + 1);
          });
        }
      } else {
        category.transactions.slice(position).forEach(t => {
          t.setPosition(t.position + 1);
        });

        self.category.transactions.slice(self.position + 1).forEach(t => {
          t.setPosition(t.position - 1);
        });
      }

      self.category = category;
      self.position = position;
    }
  }))
  .actions(self => ({
    beforeDestroy() {
      self.setCategoryAndPosition(self.category, Number.MAX_SAFE_INTEGER);
    }
  }));

export type ITransaction = typeof Transaction.Type;
