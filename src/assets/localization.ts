const localization = {
  user: {
    loginComp: {
      title: { en: 'Login', ru: 'Вход' },
      question: { en: "Dont't have an account?", ru: 'Нет аккаунта?' },
      solution: { en: 'signUp', ru: 'Регистрация' },
      button: { en: 'signIn', ru: 'войти' },
    },
    registration: {
      title: { en: 'Registration', ru: 'Регистрация' },
      question: { en: 'Already have an account?', ru: 'Есть аккаунт?' },
      solution: { en: 'signIn', ru: 'Вход' },
      button: { en: 'registration', ru: 'регистрация' },
    },
    edit: {
      title: { en: 'Edit user', ru: 'Редактировать профиль' },
      button: { en: 'Save Changes', ru: 'Сохранить изменения' },
      removeButton: { en: 'Remove accaunt', ru: 'Удалить профиль' },
      backButton: { en: 'back', ru: 'назад' },
    },
    common: {
      loginField: {
        label: { en: 'login', ru: 'логин' },
        requiredError: { en: 'Please enter a login', ru: 'Пожалуйста, введите логин' },
      },
      passwordField: {
        label: { en: 'password', ru: 'пароль' },
        requiredError: { en: 'Please enter a password', ru: 'Пожалуйста, введите пароль' },
        notStrongError: { en: "Your password isn't strong enough", ru: 'Пароль недостаточно сложный' },
        lengthError: { en: 'at least 8 characters', ru: 'Минимум 8 символов' },
        caseError: { en: 'a mixture of both uppercase and lowercase letters', ru: 'Используйте символы в верхнем и нижнем регистре' },
        symbolsError: { en: 'inclusion of at least one special character: !@#$%^&*', ru: 'ИСпользуйте символы !@#$%^&*' },
      },
      newPasswordField: {
        label: { en: 'new password', ru: 'новый пароль' },
        equalError: { en: 'The new password cannot be equal to the current one', ru: 'Новый пароль не может быть равен текущему' },
      },
      passwordRepeatField: {
        label: { en: 'repeat password', ru: 'повторите пароль' },
        notEqualError: { en: "Doesn't match", ru: 'Пароли не совпадают' },
      },
      nameField: {
        label: { en: 'name', ru: 'имя' },
        requiredError: { en: 'Please enter your name', ru: 'Пожалуйста, введите ваше имя' },
      },
      errors: {
        authError: { en: 'Authorithation failed', ru: 'Ошибка авторизации' },
        loginExistError: { en: 'User login already exists!', ru: 'Ошибка авторизации' },
      },
    },
  },
  header: {
    currentLang: { en: 'ENG', ru: 'RU' },
  },
};



function readLocalization(obj: any, lang: string) {
  if (obj[lang]) {
    return obj[lang];
  } else {
    const result: { [key: string]: any } = {};
    for (const key of Object.keys(obj) as string[]) {
      result[key] = readLocalization(obj[key], lang);
    }
    return result;
  }
}

export function getTranslate(lang: string) {
  return readLocalization(localization, lang);
}
