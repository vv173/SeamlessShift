export interface RequestsData {
  id: number;
  issueDate: Date;
  comment: string;
  classesId: number;
  userId: number;
  date: Date;
}

export const getRequestsIssued = (): Promise<RequestsData[]> => {
  return new Promise((res) => {
    setTimeout(() => {
      res([
        {
          id: 1,
          issueDate: new Date('2023-10-04T12:00:00'),
          comment: 'example1',
          classesId: 1,
          userId: 2,
          date: new Date('2023-10-05T14:00:00')
        },
        {
          id: 2,
          issueDate: new Date('2023-10-04T11:00:00'),
          comment: 'example2',
          classesId: 4,
          userId: 1,
          date: new Date('2023-10-05T14:30:00')
        },
        {
          id: 3,
          issueDate: new Date('2023-10-04T12:00:00'),
          comment: 'example3',
          classesId: 7,
          userId: 5,
          date: new Date('2023-10-07T10:00:00')
        },
        {
          id: 4,
          issueDate: new Date('2023-10-04T09:45:33'),
          comment: 'example4',
          classesId: 1,
          userId: 2,
          date: new Date('2023-10-05T18:15:00')
        },
      ]);
    }, 0);
  });
};
