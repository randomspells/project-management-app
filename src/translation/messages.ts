import LOCALES from './locales';

const translation = {
  [LOCALES.RUSSIAN]: {
    welcome: 'Добро пожаловать!',
    team: 'Команда',
    project: 'Проект',
    course: 'Курс',
    team_desc:
      'Мы - команда #80 из трех человек: Андрей, Виктор и Женя. Всю приложуху сделали, общаясь в дискорде. У нас состоялось два созвона за месяц, но в принципе всем все было понятно, так что даже почти успели. Кроме рефакторинга...',
    project_desc:
      'Перед вами безмерно упрощенный клон Trello. При создании была использована библиотека React, Material UI для элементов интерфейса и Redux для управления состоянием приложения и сетевых запросов. Здесь можно создавать доски с задачами, списки задач, сами задачи, менять их, удалять и так далее. Возможно даже завалялась парочка багов.',
    course_desc:
      'Это приложение стало итогом выполнения бесплатного курса по React от сообщества разработчиков The Rolling Scopes. Обучение в RS School доступно всем желающим и для начинающего разработчика это очень полезное вложение времени.',
    lang: 'Язык',
    edit_profile: 'Редактировать профиль',
    sign_out: 'Выйти',
    add_task_list: 'Добавить список задач',
    no_task_lists: 'Нет списков задач.',
    cancel: 'Отменить',
    save: 'сохранить',
    delete_user: 'Удалить',
    error: 'Страница не найдена',
    login: 'Войти',
    dont_have_account: 'У вас нет аккаунта? Зарегистрироваться',
    create_board: 'Создать доску',
    sign_up: 'Зарегистрироваться',
    have_account: 'У вас уже есть аккаунт? Авторизоваться.',
    go_to_main_page: 'На главную страницу',
    save_task: 'Сохранить задачу',
    create_task: 'Создать задачу',
    create_task_list: 'Создать список задач',
    delete_task_list: 'Удалить список задач',
    success: 'Успешно',
    sure: 'Вы уверены?',
    no: 'Нет',
    yes: 'Да',
    you_are_going_to_delete: 'Вы собираетесь удалить',
    irreversible: '. Это действие необратимо.',
    new_board: 'Новая доска',
    edit_task: 'Изменить задачу',
    new_task: 'Новое задача',
    new_task_list: 'Новый список задач',
    task_title: 'Название задачи',
    task_description: 'Описание задачи',
    board_title: 'Название доски',
    board_description: 'Описание доски',
    task_list_title: 'Название списка задач',
    search_fields: 'Поиск',
    login_input: 'Логин',
    password_input: 'Пароль',
    name_input: 'Имя',
    old_password: 'Старый пароль',
    new_password: 'Новый пароль',
    only_letters: 'Только буквы',
    validate_old_password: 'Введите старый пароль',
    validate_new_password: 'Введите только буквы и цифры',
    validate_signin_input: 'Только английские буквы, не меньше 3 букв.',
    validate_sigin_password:
      'Введите цифры и аанглийские буквы, не меньше 6 символов.',
    title_required: 'Название обязательно должно быть заполнено',
    description_required: 'Описание обязательно должно быть заполнено',
  },
  [LOCALES.ENGLISH]: {
    welcome: 'Welcome!',
    team: 'Team',
    project: 'Project',
    course: 'Course',
    team_desc:
      'We are the three members of team #80: Andrey, Viktor, and Eugenia. We communicated throughout the development process via Discord and also had two whole meetings (!) during last month. We completed almost all task goals, except for refactoring.',
    project_desc:
      'This application is a simplified clone of Trello. We used React library, Material UI for UI components, and also Redux to manage the state of our app. You can create workspaces, task lists and tasks; remove or edit them, and so on. Probably you could even find a couple of bugs.',
    course_desc:
      'Our app is the result of a free React course conducted by The Rolling Scopes developer community. Everyone can study at RS School and for beginners it is a very valuable investment of time.',
    lang: 'Lang',
    edit_profile: 'Edit profile',
    sign_out: 'Sign out',
    add_task_list: 'Add task list',
    no_task_lists: 'No task lists to display.',
    cancel: 'Cancel',
    save: 'Save',
    delete_user: 'Delete user',
    error: '404 Error',
    login: 'Login',
    dont_have_account: "Don't have an account? Sign Up",
    create_board: 'Create Board',
    sign_up: 'Sign Up',
    have_account: 'Already have an account? Login.',
    go_to_main_page: 'Go to main page',
    save_task: 'Save task',
    create_task: 'Create task',
    create_task_list: 'Create task list',
    delete_task_list: 'Delete task list',
    success: 'Success',
    sure: 'Are you sure?',
    no: 'No',
    yes: 'Yes',
    you_are_going_to_delete: 'You are going to delete',
    irreversible: '. This action is irreversible.',
    new_board: 'New board',
    edit_task: 'Edit task',
    new_task: 'New task',
    new_task_list: 'New task list',
    task_title: 'Task title',
    task_description: 'Task description',
    board_title: 'Board title',
    board_description: 'Board description',
    task_list_title: 'Task list title',
    search_fields: 'Search Fields',
    login_input: 'Login',
    password_input: 'Password',
    name_input: 'Name',
    old_password: 'Old password',
    new_password: 'New password',
    only_letters: 'Please, enter only letters',
    validate_old_password: 'Please, enter old password',
    validate_new_password: 'Please, enter letters and numbers',
    validate_signin_input: 'Please enter only EN letters. Min length 3.',
    validate_sigin_password:
      'Please enter EN letters and numbers. Min length 6.',
    title_required: 'Title is required',
    description_required: 'Description is required',
  },
};

export default translation;
