const mockFindAll = jest.fn();
const mockReportService = { findAll: mockFindAll };

jest.mock('./report.service', () => ({
  ReportService: jest.fn().mockImplementation(() => mockReportService),
}));

import { Test, TestingModule } from '@nestjs/testing';

import { ReportController } from './report.controller';
import { ReportService } from './report.service';

describe('ReportController', () => {
  let controller: ReportController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReportController],
      providers: [ReportService],
    }).compile();

    controller = module.get<ReportController>(ReportController);
  });

  test('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('should return total report', () => {
    mockFindAll.mockReturnValue({
      balanceReport: {
        totalIncomes: 500,
        totalExpenses: 100,
        totalBalance: 400,
      },
      expensesGroupByConcept: new Map<string, number>([
        ['concept 1', -50],
        ['concept 2', -20],
      ]),
      expensesGroupByMovement: new Map<string, number>([
        ['movement 1', -50],
        ['movement 2', -20],
      ]),
      expensesGroupByNotes: new Map<string, number>([
        ['note 1', -50],
        ['note 2', -20],
      ]),
      incomesGroupByConcept: new Map<string, number>([
        ['concept 1', -50],
        ['concept 2', -20],
      ]),
      incomesGroupByMovement: new Map<string, number>([
        ['movement 1', -50],
        ['movement 2', -20],
      ]),
      incomesGroupByNotes: new Map<string, number>([
        ['note 1', -50],
        ['note 2', -20],
      ]),
    });

    const result = controller.findAll();

    expect(result).toEqual({
      balanceReport: {
        totalIncomes: 500,
        totalExpenses: 100,
        totalBalance: 400,
      },
      expensesGroupByConcept: new Map<string, number>([
        ['concept 1', -50],
        ['concept 2', -20],
      ]),
      expensesGroupByMovement: new Map<string, number>([
        ['movement 1', -50],
        ['movement 2', -20],
      ]),
      expensesGroupByNotes: new Map<string, number>([
        ['note 1', -50],
        ['note 2', -20],
      ]),
      incomesGroupByConcept: new Map<string, number>([
        ['concept 1', -50],
        ['concept 2', -20],
      ]),
      incomesGroupByMovement: new Map<string, number>([
        ['movement 1', -50],
        ['movement 2', -20],
      ]),
      incomesGroupByNotes: new Map<string, number>([
        ['note 1', -50],
        ['note 2', -20],
      ]),
    });
  });
});
