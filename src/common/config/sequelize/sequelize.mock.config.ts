import { Sequelize } from 'sequelize';


class MockDatabase {
    private static instance: Sequelize;
  
    private constructor() {}
  
    public static getInstance(): Sequelize {
      if (!MockDatabase.instance) {
        MockDatabase.instance = {
          define: () => ({}),
          authenticate: async () => Promise.resolve(),
          sync: async () => Promise.resolve(),
          close: async () => Promise.resolve(),
        } as unknown as Sequelize;
      }
      return MockDatabase.instance;
    }
  }
  
  export default MockDatabase;
  