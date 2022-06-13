API HOTELARIA

# Cadastro de quarto

-Deve ser possível cadastrar um novo quarto

-Não deve ser possível cadastrar um quarto já existente
-O quarto deve ser cadastrado, por padrão, com disponibilidade

-O cadastro só pode ser realizado por um usuário administrador


# Listagem de quartos

- Deve ser possível listar todos os quartos disponíveis
- Deve ser possível listar todos os quartos disponíveis por sede
- ***Deve ser possível listar todos os quartos disponíveis pela capacidade
- Deve ser possível listar todos os quartos disponíveis pelo número de camas
- Deve ser possível listar todos os quartos disponíveis pelo tipo de cama (solteiro ou casal)

- O usuário não precisa estar logado no sistema


# Cadastro de imagens do quarto

- Deve ser possível cadastrar a imagem do quarto

- Utilizar o multer para upload dos arquivos

- O usuário poderá cadastrar mais de uma imagem para o mesmo quarto
- O usuário responsável pelo cadastro deve ser um administrador


# Reserva de quarto

- Deve ser possível reservar um quarto

- A reserva deve ter duração mínima de 24 horas.
- Não deve ser possível cadastrar uma reserva caso já exista uma aberta para o mesmo usuário
- Não deve ser possível cadastrar uma reserva caso já exista uma aberto para o mesmo quarto
- Ao realizar uma reserva, o status do quarto deverá ser alterado para indisponível

- O usuário deve estar logado na aplicação reservar um quarto


# Desalocação de quarto 

- Deve ser possível realizar a desalocação de um quarto

- Se o quarto for devolvido com menos de 24 horas, deverá ser cobrado a diária completa
- Ao realizar a desalocação, o status do quarto deverá ser alterado para disponível.
- Ao realizar a devolução, deverá ser calculado o total da reserva. 

- Caso haja multa, deverá ser somado ao total do quarto.

- O usuário deve estar logado na aplicação


# Listagem de Alugueis para usuário


- Deve ser possível realizar a listagem de todas as reservas do usuário.

- O usuário deve estar logado na aplicação


// a especificar
# Recuperar Senha

**RF**
- Deve ser possível o usuário recuperar a senha informando o e-mail
- O usuário deve receber um e-mail com o passo a passo para a recuperação da senha
- O usuário deve conseguir inserir uma nova senha

**RN**
- O usuário precisa informar uma nova senha
- O link enviado para a recuperação deve expirar em 3 horas