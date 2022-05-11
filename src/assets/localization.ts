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
    removeUser: { en: 'Remove accaunt', ru: 'Удалить профиль' },
    signIn: { en: 'Sign in', ru: 'Войти' },
    signUp: { en: 'Sign up', ru: 'Регистрация' },
    removeUserConfirm: {
      question: { en: 'Remove user and all his tasks and boards', ru: 'Удалить аккаунт вместе со всеми задачами и досками?' },
      approve: { en: 'Remove', ru: 'Удалить' },
      cancel: { en: 'Cancel', ru: 'Нет' },
    },
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
  newTaskModal: {
    title: { en: 'Create new task', ru: 'Создать новую задачу' },
    label: { en: 'Add a task', ru: 'Добавьте задачу' },
    button: { en: 'Create', ru: 'Создать' },
  },
  editTaskModal: {
    title: { en: 'Edit the task', ru: 'Редактировать задачу' },
    label: { en: 'Edit', ru: 'Редактируйте' },
    button: { en: 'Save', ru: 'Сохранить' },
  },
  newBoardModal: {
    title: { en: 'Create new board', ru: 'Создать новую доску' },
    label: { en: 'Title', ru: 'Название' },
    errorMessage: {
      en: 'Please enter a board title',
      ru: 'Пожалуйста, введите название доски',
    },
    button: { en: 'Create', ru: 'Создать' },
  },
  newListModal: {
    title: { en: 'Create new list', ru: 'Создать новый список' },
    label: { en: 'Title', ru: 'Название' },
    errorMessage: {
      en: 'Please enter a list title',
      ru: 'Пожалуйста, введите название списка',
    },
    orderError: {
      en: 'Please enter a list order',
      ru: 'Пожалуйста, введите номер списка',
    },
    order: { en: 'Order', ru: 'Номер' },
    button: { en: 'Create', ru: 'Создать' },
  },
  mainPage: {
    title: { en: 'Tracker', ru: 'Трекер' },
    description: {
      en: 'Monitor all your tasks with Tracker, a service for project management, resource allocation, and collaboration.',
      ru: 'Контролируйте все свои задачи с помощью Трекера, сервиса для управления проектами, распределения ресурсов и сотрудничества.',
    },
    button: { en: 'Try it', ru: 'Попробуйте' },
    tabOneContent: {
      en: 'Set up Agile development projects in Tracker: estimate timelines, plan sprints, monitor issue progress on a virtual board, and track their completion on dashboards.',
      ru: 'Настройте гибкую разработку проектов в Трекере: рассчитывайте сроки, планируйте спринты, следите за прогрессом задач на виртуальной доске и отслеживайте их завершение на дашбордах.',
    },
    tabOneLabel: { en: 'Development', ru: 'Разработка' },
    tabTwoContent: {
      en: 'Set up document flows in Tracker. Collaborate on and approve documents on the same platform to formalize processes and eliminate routine tasks.',
      ru: 'Настройте документооборот в Трекере. Совместная работа над документами и их утверждение на одной платформе формализирует процесс и устраняет рутинные задачи.',
    },
    tabTwoLabel: { en: 'Document flow', ru: 'Документооборот' },
    tabThreeContent: {
      en: 'Build dashboards to prepare materials for marketing campaigns. Make graphs and statistics to visualize and organize processes. Time tracking and comments make work with contractors more transparent.',
      ru: 'Создавайте дашборды для подготовки материалов для маркетинговых кампаний. Делайте графики и статистику для визуализации и организации процессов. Учёт рабочего времени и комментарии делают работу с подрядчиками более прозрачной.',
    },
    tabThreeLabel: { en: 'Marketing', ru: 'Маркетинг' },
    tabFourContent: {
      en: 'Use Tracker for iterative work. Discuss layouts with co-workers right on the issue page and don’t lose any comments. For standard issues, create project templates and automate the approval process.',
      ru: 'Используйте Трекер для последовательной работы. Обсуждайте макеты с коллегами прямо на странице и не теряйте комментарии. Для стандартных задач создайте шаблоны проектов и автоматизируйте процесс утверждения.',
    },
    tabFourLabel: { en: 'Design', ru: 'Дизайн' },
    tabFiveContent: {
      en: 'Build HR processes in Tracker: from hiring new employees to evaluating workloads and approving vacations. Monitor a department’s activities using visual dashboards, collect statistics, and optimize processes.',
      ru: 'Выстраивайте HR-процессы в Трекере: от найма новых сотрудников до оценки нагрузки и согласования отпусков. Отслеживайте деятельность отдела с помощью дашбордов, собирайте статистику и оптимизируйте процессы.',
    },
    tabFiveLabel: { en: 'Human resources', ru: 'Управление персоналом' },
    tabSixContent: {
      en: 'Use Tracker for infrastructure tasks: equipment purchases, inventory management, bookkeeping, and more. Configure key project SLAs to monitor progress.',
      ru: 'Используйте Трекер для инфраструктурных задач: покупка оборудования, управление инвентаризацией, бухгалтерия и многое другое. Настройте ключевые SLA (соглашение об уровне обслуживания) проекта для мониторинга прогресса.',
    },
    tabSixLabel: { en: 'Infrastructure', ru: 'Инфраструктура' },
    gridOneContent: {
      en: 'Tracker is a convenient solution for businesses of all sizes, with a universal approach right for any industry.',
      ru: 'Трекер — удобное решение для бизнеса любого размера, с универсальным подходом для любой отрасли.',
    },
    gridOneLabel: {
      en: 'Flexible work environment',
      ru: 'Гибкая рабочая среда',
    },
    gridTwoContent: {
      en: 'Tracker is designed to handle heavy workloads.',
      ru: 'Трекер предназначен для работы с большими нагрузками.',
    },
    gridTwoLabel: { en: 'Fault tolerance', ru: 'Отказоустойчивость' },
    gridThreeContent: {
      en: 'Our project planning software has best features as well as features of the team management software.',
      ru: 'Наше программное обеспечение для планирования проектов обладает лучшими функциями, а также функциями для управления командой.',
    },
    gridThreeLabel: {
      en: 'Manage team and track progress',
      ru: 'Управляйте командой и отслеживайте прогресс',
    },
    gridFourContent: {
      en: 'To make project management even easier, we let our users prioritize tasks, indent and outdent, set dependencies in one click, durations and progress right on a chart online by dragging and dropping tasks and their attributes.',
      ru: 'Чтобы сделать управление проектами еще проще, мы позволяем нашим пользователям приоритизировать задачи, устанавливать отступы, устанавливать зависимости одним щелчком мыши, продолжительность и прогресс прямо на онлайн-диаграмме, перетаскивая задачи и их атрибуты.',
    },
    gridFourLabel: {
      en: 'Automatic online project scheduling and drag and drop simplicity',
      ru: 'Автоматическое планирование онлайн-проектов и простота перетаскивания',
    },
  },
  defaultConfirm: {
    question: { en: 'Are you sure?', ru: 'Вы уверены?' },
    approve: { en: 'Ok', ru: 'Да' },
    cancel: { en: 'Cancel', ru: 'Нет' },
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
