export async function loginUser(email, senha) {
  if (email === 'teste@teste.com' && senha === '123456') {
    return true;
  }
  return false;
}
