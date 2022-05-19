export default {
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
      backButton: { en: 'Back', ru: 'Назад' },
    },
    common: {
      loginField: {
        label: { en: 'Login', ru: 'Логин' },
        requiredError: {
          en: 'Please, enter a login',
          ru: 'Пожалуйста, введите логин',
        },
      },
      passwordField: {
        label: { en: 'Password', ru: 'Пароль' },
        requiredError: {
          en: 'Please, enter a password',
          ru: 'Пожалуйста, введите пароль',
        },
        notStrongError: {
          en: "Your password isn't strong enough",
          ru: 'Пароль недостаточно сложный',
        },
        lengthError: { en: 'At least 8 characters', ru: 'Минимум 8 символов' },
        caseError: {
          en: 'A mixture of both uppercase and lowercase letters',
          ru: 'Используйте символы в верхнем и нижнем регистре',
        },
        symbolsError: {
          en: 'Inclusion of at least one special character: !@#$%^&*',
          ru: 'Используйте символы !@#$%^&*',
        },
      },
      newPasswordField: {
        label: { en: 'New password', ru: 'Новый пароль' },
        equalError: {
          en: 'The new password cannot be equal to the current one',
          ru: 'Новый пароль не может быть равен текущему',
        },
      },
      passwordRepeatField: {
        label: { en: 'Repeat password', ru: 'Повторите пароль' },
        notEqualError: { en: "Doesn't match", ru: 'Пароли не совпадают' },
      },
      nameField: {
        label: { en: 'Name', ru: 'Имя' },
        requiredError: {
          en: 'Please, enter your name',
          ru: 'Пожалуйста, введите ваше имя',
        },
      },
      errors: {
        authError: { en: 'Authorithation failed', ru: 'Ошибка авторизации' },
        loginExistError: {
          en: 'User login already exists!',
          ru: 'Пользователь с таким логином уже существует!',
        },
      },
    },
  },
  header: {
    currentLang: { en: 'ENG', ru: 'RU' },
    createBoardButton: { en: 'Create a new board', ru: 'Создать новую доску' },
    loginButton: { en: 'Log in', ru: 'Вход' },
    editProfile: { en: 'Edit profile', ru: 'Изменить профиль' },
    logout: { en: 'Log out', ru: 'Выйти из аккаунта' },
    removeUser: { en: 'Remove account', ru: 'Удалить профиль' },
    signIn: { en: 'Sign in', ru: 'Войти' },
    signUp: { en: 'Sign up', ru: 'Регистрация' },
    removeUserConfirm: {
      question: {
        en: 'Remove user and all his tasks and boards',
        ru: 'Удалить аккаунт вместе со всеми задачами и досками?',
      },
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
    inputLabel: { en: 'Enter a new title', ru: 'Введите новое название' },
    tooltipSubmit: { en: 'Submit', ru: 'Сохранить' },
    tooltipCancel: { en: 'Cancel', ru: 'Отменить' },
    addButton: { en: 'Add a card', ru: 'Добавить задание' },
    dropError: { en: 'you cant move task if it has responsable users and you are not one of them', ru: 'Вы не можете перемещать задачи, у которых есть ответственные пользователи, если вы не один из них' },
  },
  workspace: {
    menuTitle: { en: 'More options', ru: 'Больше параметров' },
    show: { en: 'Show', ru: 'Показать' },
    hide: { en: 'Hide', ru: 'Скрыть' },
    panelDescription: { en: 'the options', ru: 'параметры' },
    recent: { en: 'Recent', ru: 'Недавние' },
    searchLabel: { en: 'Search', ru: 'Поиск' },
    sidebarTitle: { en: 'Your boards', ru: 'Ваши доски' },
    backButton: { en: 'Back to', ru: 'Назад' },
    joke: { en: 'the future', ru: 'в будущее' },
    main: { en: 'main', ru: 'на главную' },
    showMenu: { en: 'Show menu', ru: 'Показать меню' },
    inputLabel: { en: 'Board title', ru: 'Заголовок доски' },
  },
  taskModal: {
    editMode: {
      title: { en: 'Edit the task', ru: 'Изменить задачу' },
      button: { en: 'Edit', ru: 'Изменить' },
    },
    createMode: {
      title: { en: 'Create a new task', ru: 'Создать новую задачу' },
      button: { en: 'Create', ru: 'Создать' },
    },
    owner: { en: 'Owner', ru: 'Владелец' },
    labelTitle: { en: 'Task title', ru: 'Название задачи' },
    errorMessageTitle: {
      en: 'Please, enter a task title',
      ru: 'Пожалуйста, введите название задачи',
    },
    labelDescription: { en: 'Description', ru: 'Описание' },
    labelFile: { en: 'Upload file', ru: 'Загрузить файл' },
    errorMessageDescription: {
      en: 'Please, enter a task description',
      ru: 'Пожалуйста, введите описание задачи',
    },
    labelMembers: { en: 'Members', ru: 'Участники' },
    moveTask: { en: 'Move task to', ru: 'Переместить задачу в' },
    checklistLabel: { en: 'Add a checklist', ru: 'Добавить чеклист' },
    pointLabel: { en: 'Enter a point title', ru: 'Введите название пункта' },
    tooltipDelete: { en: 'Delete', ru: 'Удалить' },
    invalidForm: { en: 'Fill all required fields', ru: 'Заполните все обязательные поля' },
    saveBeforeUpload: { en: 'You need to save task before file upload', ru: 'Необходимо сохранить задачу перед загрузкой файла' },
    cantEdit: { en: "You can't edit this task, becouse you are not in the list od resposobile users", ru: 'Вы не можете редактировать эту задачу, так как не входите в список ответственных пользователй' },
  },
  newBoardModal: {
    title: { en: 'Create a new board', ru: 'Создать новую доску' },
    titleField: {
      label: { en: 'Title', ru: 'Название' },
      requiredError: {
        en: 'Please, enter a board title',
        ru: 'Пожалуйста, введите название доски',
      },
    },
    ownerField: {
      label: { en: 'Owner', ru: 'Владелец' },
      requiredError: {
        en: 'Please, select a board owner',
        ru: 'Пожалуйста, назначте владельца доски',
      },
    },
    usersField: {
      label: { en: 'Members', ru: 'Участники' },
    },
    button: { en: 'Create', ru: 'Создать' },
  },
  newListModal: {
    title: { en: 'Create a new list', ru: 'Создать новый список' },
    label: { en: 'Title', ru: 'Название' },
    errorMessage: {
      en: 'Please, enter a list title',
      ru: 'Пожалуйста, введите название списка',
    },
    orderError: {
      en: 'Please, enter a list order',
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
    projectDescription: {
      en: 'This application for creating a project management system was created as part of the Angular 2022Q1 course from Rolling Scopes School. Worked on the project: Alexander, Andrey and Elena.',
      ru: 'Это приложение по созданию системы управления проектами было создано в рамках курса Angular 2022Q1 от Rolling Scopes School. Над проектом работали: Александр, Андрей и Елена.',
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
  boardPreview: {
    columnLabel: { en: 'Columns:', ru: 'Колонки:' },
    noColumns: { en: 'No columns', ru: 'Нет колонок' },
    tooltip: {
      en: 'Sorry, only board owner can manage it!',
      ru: 'Извините, только владелец доски может управлять ею!',
    },
    taskCount: { en: 'Tasks count:', ru: 'Количество задач:' },
    noTasks: { en: 'No tasks', ru: 'Нет задач' },
  },
  searchModal: {
    title: { en: 'Title:', ru: 'Название:' },
    description: { en: 'Descr.:', ru: 'Опис.:' },
    goToBoardButton: { en: 'Go to the board', ru: 'Перейти на доску' },
    noResults: {
      en: 'No results. Try again',
      ru: 'Нет результатов. Попробуйте ещё раз',
    },
  },
  defaultConfirm: {
    question: { en: 'Are you sure?', ru: 'Вы уверены?' },
    approve: { en: 'Yes', ru: 'Да' },
    cancel: { en: 'No', ru: 'Нет' },
  },
  notifications: {
    user: {
      signIn: { en: 'Successfull logged in', ru: 'Успешная авторизация' },
      signUp: { en: 'Successfull registred', ru: 'Успешная регистрация' },
      lofOut: { en: 'Successfull logged out', ru: 'Успешный выход из аккаунта' },
      edit: { en: 'Successfull edited', ru: 'Данные пользователя изменены' },
      delete: { en: 'Successfull deleted', ru: 'Аккаунт удален' },
    },
    board: {
      create: { en: 'Board created', ru: 'Доска создана' },
      update: { en: 'Board edited', ru: 'Доска изменена' },
      delete: { en: 'Board deleted', ru: 'Доска удалена' },
    },
    column: {
      create: { en: 'Column created', ru: 'Колонка создана' },
      update: { en: 'Column edited', ru: 'Колонка изменена' },
      delete: { en: 'Column deleted', ru: 'Колонка удалена' },
    },
    task: {
      create: { en: 'Task created', ru: 'Задача создана' },
      update: { en: 'Task edited', ru: 'Задача изменена' },
      delete: { en: 'Task deleted', ru: 'Задача удалена' },
    },
    file: {
      create: { en: 'File uploaded', ru: 'Файл загружен' },
      delete: { en: 'File deleted', ru: 'Файл удален' },
      exoistError: { en: 'File already exists', ru: 'Файл уже существует' },
      typeError: { en: 'Incorrect file. Only images', ru: 'Некорректный файл. Только изображения' },
    },
    emptySearchError: { en: 'Empty request', ru: 'Пустой запрос' },
  },
  socketActions: {
    column: {
      add: {
        many: { en: 'has created columns', ru: 'создал колонки' },
        one: { en: 'has created column', ru: 'создал колонку' },
      },
      update: {
        many: { en: 'has edited columns', ru: 'изменил колонки' },
        one: { en: 'has edited column', ru: 'изменил колонку' },
      },
      delete: {
        many: { en: 'has deleted columns', ru: 'удалил колонки' },
        one: { en: 'has deleted column', ru: 'удалил колонку' },
      },
    },
    task: {
      add: {
        many: { en: 'has created tasks', ru: 'создал задачи' },
        one: { en: 'has created task', ru: 'создал задачу' },
      },
      update: {
        many: { en: 'has edited tasks', ru: 'изменил задачи' },
        one: { en: 'has edited task', ru: 'изменил задачу' },
      },
      delete: {
        many: { en: 'has deleted tasks', ru: 'удалил задачи' },
        one: { en: 'has deleted task', ru: 'удалил задачу' },
      },
    },
  },
};
