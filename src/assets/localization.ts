const localization = {
  user: {
    loginComp: {
      title: { en: 'Login', ru: 'Вход' },
      question: { en: "Dont't have an account?", ru: 'Нет аккаунта?' },
      solution: { en: 'Sign Up', ru: 'Регистрация' },
      button: { en: 'Sign In', ru: 'Войти' },
    },
    registration: {
      title: { en: 'Registration', ru: 'Регистрация' },
      question: { en: 'Already have an account?', ru: 'Есть аккаунт?' },
      solution: { en: 'Sign In', ru: 'Вход' },
      button: { en: 'Registration', ru: 'Регистрация' },
    },
    edit: {
      title: { en: 'Edit user', ru: 'Редактировать профиль' },
      button: { en: 'Save Changes', ru: 'Сохранить изменения' },
      removeButton: { en: 'Remove accaunt', ru: 'Удалить профиль' },
      backButton: { en: 'Back', ru: 'назад' },
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
    createBoardButton: { en: 'Create new board', ru: 'Создать новую доску' },
    loginButton: { en: 'Log in', ru: 'Вход' },
    editProfile: { en: 'Edit profile', ru: 'Изменить профиль' },
    logout: { en: 'Log out', ru: 'Выйти из аккаунта' },
    signIn: { en: 'Sign in', ru: 'Войти' },
    signUp: { en: 'Sign up', ru: 'Регистрация' },
  },
  footer: {
    troitskiy: {en:'Andrew Troitskiy', ru: 'Андрей Троицкий'},
    afanasenka: {en: 'Aliaksandr Afanasenka', ru: 'Александр Афанасенко'},
    karpovich: {en: 'Elena Karpovich', ru: 'Елена Карпович'},
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
