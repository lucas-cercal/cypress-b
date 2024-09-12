/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("../../src/index.html");
  });

  it("Verifica o título da página da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente");
  });

  it("Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get('[data-cy="first-name"]').type("Lucas");
    cy.get('[data-cy="last-name"]').type("Cercal Fontes");
    cy.get('[data-cy="email"]').type("email.invalido");
    cy.get('[data-cy="open-text-area"]').type("Lorem ipsum");
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="error-message"]').should("be.visible");
  });

  it("O campo telefone deve continuar vazio caso preenchido com valor não-numérico", () => {
    cy.get('[data-cy="phone"]').type("abcdefg").should("have.value", "");
  });

  it("Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get('[data-cy="first-name"]').type("Lucas");
    cy.get('[data-cy="last-name"]').type("Cercal Fontes");
    cy.get('[data-cy="email"]').type("lucascercal.fontes@gmail.com");
    cy.get('[data-cy="open-text-area"]').type("Lorem ipsum");
    cy.get('[data-cy="contact-phone"]').check();
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="error-message"]').should("be.visible");
  });

  it("Preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get('[data-cy="first-name"]')
      .type("Lucas")
      .clear()
      .should("have.value", "");
    cy.get('[data-cy="last-name"]')
      .type("Cercal Fontes")
      .clear()
      .should("have.value", "");
    cy.get('[data-cy="email"]')
      .type("lucascercal.fontes@gmail.com")
      .clear()
      .should("have.value", "");
    cy.get('[data-cy="open-text-area"]')
      .type("Lorem ipsum")
      .clear()
      .should("have.value", "");
  });

  it("Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="error-message"]').should("be.visible");
  });

  it("Seleciona um produto (YouTube) por seu texto", () => {
    cy.get('[data-cy="product"]')
      .select("YouTube")
      .should("have.value", "youtube");
  });

  it('Marca o tipo do atendimento "Feedback"', () => {
    cy.get('[data-cy="support-feedback"]')
      .check()
      .should("have.value", "feedback");
  });

  it("Seleciona um arquivo da pasta fixtures", () => {
    cy.get('[data-cy="file-upload"]')
      .selectFile("./cypress/fixtures/example.json")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("Preenche os campos obrigatórios e envia o formulário", () => {
    const longDescription =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat sem vel odio feugiat convallis.";
    cy.get('[data-cy="first-name"]').type("Lucas");
    cy.get('[data-cy="last-name"]').type("Cercal Fontes");
    cy.get('[data-cy="email"]').type("lucascercal.fontes@gmail.com");
    cy.get('[data-cy="phone"]').type("41985318314");
    cy.get('[data-cy="product"]').select("Cursos");
    cy.get('[data-cy="contact-email"]').check();
    cy.get('[data-cy="contact-phone"]').check();
    cy.get('[data-cy="open-text-area"]').type(longDescription);
    cy.get('[data-cy="submit-button"]').click();
    cy.get('[data-cy="success-message"]').should("be.visible");
  });

  it("Envia o formulário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();
    cy.get('[data-cy="success-message"]').should("be.visible");
  });
});
