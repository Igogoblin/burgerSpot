describe('Burger Constructor Functionality', () => {
  const testIngredientName = 'Флюоресцентная булка R2-D3';
  const testSauceName = 'Соус Spicy-X';
  const testMainName = 'Мясо бессмертных моллюсков Protostomia';

  beforeEach(() => {
    cy.visit('/');
    cy.get('[data-cy="ingredient-card"]').should('be.visible');
  });
  // здесь выполним проверку на открытие и закрытие модального окна и его содержимого
  it('should open and close an ingredient modal', () => {
    // 1. Найти ингредиент и кликнуть по нему
    cy.get('[data-cy="ingredient-card"]').contains(testIngredientName).click();

    // 2. Проверить, что модальное окно открылось
    cy.get('[data-cy="modal"]').should('exist').and('be.visible');
    cy.get('[data-cy="modal-title"]').should('contain', 'Детали ингредиента');

    // 3. Проверить отображение данных ингредиента в модальном окне
    cy.get('[data-cy="modal-ingredient-name"]').should('contain', testIngredientName);
    cy.get('[data-cy="modal-ingredient-calories"]').should('exist');
    cy.get('[data-cy="modal-ingredient-proteins"]').should('exist');
    cy.get('[data-cy="modal-ingredient-fat"]').should('exist');
    cy.get('[data-cy="modal-ingredient-carbohydrates"]').should('exist');

    // 4. Закрыть модальное окно при клике на кнопку закрытия
    cy.get('[data-cy="modal-close-button"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');
  });
  // здесь проверим перетаскивание ингредиентов в конструктор и модалку заказа
  it('should drag and drop ingredients to the constructor and make an order', () => {
    // 1. Перетаскивание булки
    cy.get('[data-cy="ingredient-card"]')
      .contains(testIngredientName)
      .drag('[data-cy="constructor-area"]');

    // Проверяем, что булка появилась в конструкторе (верхняя и нижняя)
    cy.get('[data-cy="constructor-bun-top"]').should('contain', testIngredientName);
    cy.get('[data-cy="constructor-bun-bottom"]').should('contain', testIngredientName);

    // 2. Перетаскивание нескольких других ингредиентов (соус, начинка)
    cy.get('[data-cy="ingredient-card"]')
      .contains(testSauceName)
      .drag('[data-cy="constructor-area"]');

    cy.get('[data-cy="ingredient-card"]')
      .contains(testMainName)
      .drag('[data-cy="constructor-area"]');

    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/login');
    cy.get('input[name="email"]').type('testGroup53@test.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button').contains('Войти').click();
    cy.wait(1000);
    cy.url().should('eq', Cypress.config().baseUrl + '/');

    // После авторизации, нажимаем кнопку "Оформить заказ"
    cy.get('[data-cy="order-button"]').click();

    // 4. Проверить, что открылось модальное окно с данными о заказе
    cy.get('[data-cy="modal"]').should('exist').and('be.visible');
    cy.get('[data-cy="order-status-text"]').should('contain', 'идентификатор заказа');

    // 5. Закрыть модальное окно заказа
    cy.get('[data-cy="modal-close-button"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    // Проверяем, что конструктор очистился после заказа
    cy.get('[data-cy="constructor-area"]').should('not.contain', testIngredientName);
    cy.get('[data-cy="constructor-area"]').should('not.contain', testSauceName);
    cy.get('[data-cy="constructor-area"]').should('not.contain', testMainName);
  });

  //  Дополнительный свой тест: оформление заказа без булки
  it('should not allow ordering without a bun', () => {
    // Перетаскиваем только соус (без булки)
    cy.get('[data-cy="ingredient-card"]')
      .contains(testSauceName)
      .drag('[data-cy="constructor-area"]');
    cy.get('[data-cy="constructor-ingredient"]').should('contain', testSauceName);

    cy.get('[data-cy="order-button"]').should('not.be.disabled');
    cy.get('[data-cy="login-button"]').click();
    cy.url().should('include', '/login');
    cy.get('input[name="email"]').type('testGroup53@test.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button').contains('Войти').click();
    cy.wait(1000);
    cy.url().should('eq', Cypress.config().baseUrl + '/');
    const stub = cy.stub();
    cy.on('window:alert', stub);

    cy.get('[data-cy="order-button"]').click();

    // Проверяем, что алерт был вызван с ожидаемым текстом
    cy.wrap(stub).should(
      'have.been.calledOnceWith',
      'Пожалуйста, выберите булку для вашего заказа!'
    );

    cy.get('[data-cy="modal"]').should('not.exist');
  });
});
