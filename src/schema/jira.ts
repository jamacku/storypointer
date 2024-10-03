import chalk from 'chalk';
import { z } from 'zod';

// Story Points

export const sizeSchema = z.union([
  z.literal(1), // green
  z.literal(2), // green
  z.literal(3), // yellow
  z.literal(5), // yellow bold
  z.literal(8), // red
  z.literal(13), // red bold
]);

export const colorSizeSchema = sizeSchema.transform(val => {
  switch (val) {
    case 1 | 2:
      return chalk.green(val);
    case 3:
      return chalk.yellow(val);
    case 5:
      return chalk.yellow.bold(val);
    case 8:
      return chalk.red(val);
    case 13:
      return chalk.red.bold(val);
    default:
      return val;
  }
});

export type Size = z.infer<typeof sizeSchema>;
export type SizeWithControls = Size | 0 | -1;

// Priority

export const defaultPrioritySchema = [
  { id: 1 as const, name: 'Blocker' as const },
  { id: 2 as const, name: 'Critical' as const },
  { id: 3 as const, name: 'Major' as const },
  { id: 10200 as const, name: 'Normal' as const },
  { id: 4 as const, name: 'Minor' as const },
];

export const prioritySchema = z.object({
  id: z.union([
    z.literal(1), // Blocker
    z.literal(2), // Critical
    z.literal(3), // Major
    z.literal(10200), // Normal
    z.literal(4), // Minor
    // z.literal(10300), // Undefined
  ]),
  name: z.string(),
});

export const colorPrioritySchema = prioritySchema.transform(val => {
  switch (val.id) {
    case 1:
      return chalk.red.bold(val.name);
    case 2:
      return chalk.red(val.name);
    case 3:
      return chalk.yellow(val.name);
    case 4:
      return chalk.cyan(val.name);
    default:
      return val.name;
  }
});

export type Priority = z.infer<typeof prioritySchema>;
export type PriorityWithControls = Priority | '0' | '-1';

// Issue Type

export const issueIdSchema = z.string().regex(/^RHEL-\d+$/);

export type IssueID = z.infer<typeof issueIdSchema>;

export const defaultIssueTypeSchema = [
  { id: 1 as const, name: 'Bug' as const },
  { id: 3 as const, name: 'Task' as const },
  { id: 16 as const, name: 'Epic' as const },
  { id: 17 as const, name: 'Story' as const },
];

export const issueTypeSchema = z.object({
  id: z.union([z.literal(1), z.literal(3), z.literal(16), z.literal(17)]),
  name: z.string(),
});

export type IssueType = z.infer<typeof issueTypeSchema>;

export const issueTypeSymbolSchema = issueTypeSchema.transform(val => {
  switch (val.id) {
    case 1:
      return '🐛';
    case 3:
      return '☑️';
    case 16:
      return '⚡';
    case 17:
      return '🎁';
    default:
      return val.name;
  }
});

// Issue Status

export const defaultIssueStatusSchema = [
  { id: 11 as const, name: 'New' as const },
  { id: 81 as const, name: 'Planning' as const },
  { id: 111 as const, name: 'In Progress' as const },
  { id: 41 as const, name: 'Integration' as const },
  { id: 101 as const, name: 'Release Pending' as const },
];

export const issueStatusSchema = z.object({
  id: z.union([
    z.literal(11), // New
    z.literal(81), // Planning
    z.literal(111), // In Progress
    z.literal(41), // Integration
    z.literal(101), // Release Pending
    // z.literal(61), // Closed
  ]),
  name: z.string(),
});

export type IssueStatus = z.infer<typeof issueStatusSchema>;

export const colorIssueStatusSchema = issueStatusSchema.transform(val => {
  switch (val.id) {
    case 11 | 81:
      return chalk.cyan(val.name);
    case 111:
      return chalk.blue(val.name);
    case 41 | 101:
      return chalk.green(val.name);
    default:
      return val.name;
  }
});
