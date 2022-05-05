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
        requiredError: {
          en: 'Please enter a login',
          ru: 'Пожалуйста, введите логин',
        },
      },
      passwordField: {
        label: { en: 'password', ru: 'пароль' },
        requiredError: {
          en: 'Please enter a password',
          ru: 'Пожалуйста, введите пароль',
        },
        notStrongError: {
          en: "Your password isn't strong enough",
          ru: 'Пароль недостаточно сложный',
        },
        lengthError: { en: 'at least 8 characters', ru: 'Минимум 8 символов' },
        caseError: {
          en: 'a mixture of both uppercase and lowercase letters',
          ru: 'Используйте символы в верхнем и нижнем регистре',
        },
        symbolsError: {
          en: 'inclusion of at least one special character: !@#$%^&*',
          ru: 'ИСпользуйте символы !@#$%^&*',
        },
      },
      newPasswordField: {
        label: { en: 'new password', ru: 'новый пароль' },
        equalError: {
          en: 'The new password cannot be equal to the current one',
          ru: 'Новый пароль не может быть равен текущему',
        },
      },
      passwordRepeatField: {
        label: { en: 'repeat password', ru: 'повторите пароль' },
        notEqualError: { en: "Doesn't match", ru: 'Пароли не совпадают' },
      },
      nameField: {
        label: { en: 'name', ru: 'имя' },
        requiredError: {
          en: 'Please enter your name',
          ru: 'Пожалуйста, введите ваше имя',
        },
      },
      errors: {
        authError: { en: 'Authorithation failed', ru: 'Ошибка авторизации' },
        loginExistError: {
          en: 'User login already exists!',
          ru: 'Ошибка авторизации',
        },
      },
    },
  },
  header: {
    currentLang: { en: 'ENG', ru: 'RU' },
    createBoardButton: { en: 'Create new board', ru: 'Создать новую доску' },
    loginButton: { en: 'Log in', ru: 'Вход' },
    editProfile: { en: 'Edit profile', ru: 'Изменить профиль' },
    logout: { en: 'Log out', ru: 'Выйти из аккаунта' },
    signIn: { en: 'Sign in', ru: 'Войти' },
    signUp: { en: 'Sign up', ru: 'Регистрация' },
  },
  footer: {
    troitskiy: { en: 'Andrew Troitskiy', ru: 'Андрей Троицкий' },
    afanasenka: { en: 'Aliaksandr Afanasenka', ru: 'Александр Афанасенко' },
    karpovich: { en: 'Elena Karpovich', ru: 'Елена Карпович' },
  },
  board: {
    tooltipEdit: { en: 'Edit', ru: 'Изменить' },
    addButton: { en: 'Add another list', ru: 'Добавить список' },
  },
  list: {
    inputLabel: { en: 'Enter new title', ru: 'Введите новое название' },
    tooltipSubmit: { en: 'Submit', ru: 'Сохранить' },
    tooltipCancel: { en: 'Cancel', ru: 'Отменить' },
    addButton: { en: 'Add a card', ru: 'Добавить задание' },
  },
  workspace: {
    menuTitle: { en: 'More options', ru: 'Больше параметров' },
    show: { en: 'Show', ru: 'Показать' },
    hide: { en: 'Hide', ru: 'Скрыть' },
    panelDescription: { en: 'the options', ru: 'параметры' },
    workspace: { en: 'Workspaces', ru: 'Рабочие пространства' },
    recent: { en: 'Recent', ru: 'Недавние' },
    starred: { en: 'Starred', ru: 'Избранное' },
    templates: { en: 'Templates', ru: 'Шаблоны' },
    template: { en: 'Template', ru: 'Шаблон' },
    searchLabel: { en: 'Search', ru: 'Поиск' },
    sidebarTitle: { en: 'Your workspaces', ru: 'Ваши рабочие пространства' },
    backButton: { en: 'Back to', ru: 'Назад' },
    joke: { en: 'the future', ru: 'в будущее' },
    main: { en: 'main', ru: 'на главную' },
    showMenu: { en: 'Show menu', ru: 'Показать меню' },
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
