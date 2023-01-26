/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('../../src/index.html')
  })

  it('Verifica o título da página da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente')
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').click().type('Lucas')
    cy.get('#lastName').click().type('Cercal Fontes')
    cy.get('#email').click().type('email.invalido')
    cy.get('#open-text-area').type('Lorem ipsum')
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('O campo telefone deve continuar vazio caso preenchido com valor não-numérico', () => {
    cy.get('#phone').click().type('abcdefg').should('have.value', '')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').click().type('Lucas')
    cy.get('#lastName').click().type('Cercal Fontes')
    cy.get('#email').click().type('lucascercal.fontes@gmail.com')
    cy.get('#open-text-area').type('Lorem ipsum')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName').click().type('Lucas').clear().should('have.value', '')
    cy.get('#lastName').click().type('Cercal Fontes').clear().should('have.value', '')
    cy.get('#email').click().type('lucascercal.fontes@gmail.com').clear().should('have.value', '')
    cy.get('#open-text-area').type('Lorem ipsum').clear().should('have.value', '')
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click()
    cy.get('.error').should('be.visible')
  })

  it('Seleciona um produto (Youtube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('Seleciona um produto (Mentoria) por seu texto', () => {
    cy.get('#product').select('Mentoria').should('have.value', 'mentoria')
  })

  it('Seleciona um produto (Blog) por seu texto', () => {
    cy.get('#product').select('Blog').should('have.value', 'blog')
  })

  it('Marca o tipo do atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
  })

  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback')
    cy.get('input[type="radio"][value="ajuda"]').check().should('have.value', 'ajuda')
    cy.get('input[type="radio"][value="elogio"]').check().should('have.value', 'elogio')
  })

  it('Seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      .should((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Preenche os campos obrigatórios e envia o formulário', () => {
    const longDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec volutpat sem vel odio feugiat convallis. Morbi vulputate ultrices lacus et.'
    cy.get('#firstName').click().type('Lucas')
    cy.get('#lastName').click().type('Cercal Fontes')
    cy.get('#email').click().type('lucascercal.fontes@gmail.com')
    cy.get('#phone').click().type('41985318314')
    cy.get('#product').select('Cursos')
    cy.get('#email-checkbox').click()
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type(longDescription, { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.success').should('be.visible')
  })

  it('Envia o formulário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success').should('be.visible')
  })
})
