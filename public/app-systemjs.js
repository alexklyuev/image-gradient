System.import('example-app/index').then(
  ({
    ExampleApp,
  }) => {
    window.addEventListener('DOMContentLoaded', event => {
      const app = new ExampleApp();
      app.run();
    });
  }
);
