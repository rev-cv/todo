import {writable} from 'svelte/store';
export const tasklist = writable([
    {
        "id": 1,
        "name": "Проектш Alpha",
        "start": "2023-05-15",
        "finish": "2023-09-30",
        "finished": "2023-12-28",
        "deadline": "2024-05-12 15:15",
        "category": "Разработка ПО",
        "status": "done",
        "importance": 1,
    },
    {
        "id": 2,
        "name": "w".repeat(50),
        "start": "2023-07-01",
        "finish": "2023-12-31",
        "finished": "2023-12-28",
        "deadline": "2024-03-12 15:15",
        "category": "Маркетинг",
        "status": "done",
        "importance": 1,
    },
    {
        "id": 3,
        "name": "Обновление инфраштруктуры",
        "start": "2023-03-01",
        "finish": "2023-07-15",
        "finished": "",
        "deadline": "",
        "category": "ИТ",
        "status": "wait",
        "importance": 2,
    },
    {
        "id": 4,
        "name": "Исследование рынка",
        "start": "2023-09-01",
        "finish": "2023-11-30",
        "finished": "",
        "deadline": "2024-03-12 15:15",
        "category": "Аналитика",
        "status": "wait",
        "importance": 2,
    },
    {
        "id": 5,
        "name": "Тренинг для сотрудников",
        "start": "2023-06-01",
        "finish": "2023-06-30",
        "finished": "",
        "deadline": "2024-03-12 15:15",
        "category": "Обучение",
        "status": "wait",
        "importance": 2,
    },
    {
        "id": 6,
        "name": "Разработка мобильного приложения",
        "start": "2023-04-01",
        "finish": "2023-10-31",
        "finished": "2023-12-28",
        "deadline": "2024-03-12 15:50",
        "category": "Разработка ПО",
        "status": "fail",
        "importance": 2,
    },
    {
        "id": 7,
        "name": "Запуск рекламной кампании",
        "start": "2023-08-15",
        "finish": "2023-11-15",
        "finished": "",
        "deadline": "2024-03-12 15:50",
        "category": "Маркетинг",
        "status": "wait",
        "importance": 3,
    },
    {
        "id": 8,
        "name": "Модернизация серверов",
        "start": "2023-02-01",
        "finish": "2023-05-31",
        "finished": "",
        "deadline": "2024-03-12 15:50",
        "category": "ИТ",
        "status": "wait",
        "importance": 3,
    },
    {
        "id": 9,
        "name": "Анализ конкурентов",
        "start": "2023-07-01",
        "finish": "2023-09-30",
        "finished": "",
        "deadline": "2024-03-12 15:50",
        "category": "Аналитика",
        "status": "wait",
        "importance": 3,
    },
    {
        "id": 10,
        "name": "Курс по продажам",
        "start": "2023-08-01",
        "finish": "2023-08-31",
        "finished": "",
        "deadline": "2024-03-12 15:50",
        "category": "Обучение",
        "status": "wait",
        "importance": 0,
    },
    {
        "id": 11,
        "name": "Проект Beta",
        "start": "2023-06-01",
        "finish": "2023-11-30",
        "finished": "",
        "deadline": "2024-03-12 15:50",
        "category": "Разработка ПО",
        "status": "wait",
        "importance": 0,
    },
    {
        "id": 12,
        "name": "Продвижение в социальных сетях",
        "start": "2023-09-01",
        "finish": "2023-12-31",
        "finished": "2023-12-28",
        "deadline": "2024-03-12 15:50",
        "category": "Маркетинг",
        "status": "done",
        "importance": 0,
    },
    {
        "id": 13,
        "name": "Внедрение системы безопасности",
        "start": "2023-04-01",
        "finish": "2023-07-31",
        "finished": "",
        "deadline": "2024-03-12 15:50",
        "category": "ИТ",
        "status": "wait",
        "importance": 2,
    },
    {
        "id": 14,
        "name": "Опрос клиентов",
        "start": "2023-10-01",
        "finish": "2023-11-15",
        "finished": "",
        "deadline": "2024-03-12 15:50",
        "category": "Аналитика",
        "status": "wait",
        "importance": 1,
    },
    {
        "id": 15,
        "name": "Тренинг по эффективным коммуникациям",
        "start": "2023-07-01",
        "finish": "2023-07-31",
        "finished": "",
        "deadline": "2024-03-12 15:50",
        "category": "Обучение",
        "status": "wait",
        "importance": 3,
    },
    {
        "id": 16,
        "name": "Проект Gamma",
        "start": "2023-03-01",
        "finish": "2023-09-30",
        "finished": "",
        "deadline": "2024-03-12 15:50",
        "category": "Разработка ПО",
        "status": "wait",
        "importance": 2,
    },
    {
        "id": 17,
        "name": "Запуск email-рассылки",
        "start": "2023-06-01",
        "finish": "2023-08-31",
        "finished": "",
        "deadline": "2024-03-12 15:50",
        "category": "Маркетинг",
        "status": "wait",
        "importance": 2,
    },
    {
        "id": 18,
        "name": "Обновление сетевого оборудования",
        "start": "2023-05-01",
        "finish": "2023-08-15",
        "finished": "",
        "deadline": "2024-03-12 15:50",
        "category": "ИТ",
        "status": "wait",
        "importance": 1,
    },
    {
        "id": 19,
        "name": "Анализ удовлетворенности клиентов",
        "start": "2023-11-01",
        "finish": "2023-12-31",
        "finished": "2023-12-28",
        "deadline": "2024-03-12 15:50",
        "category": "Аналитика",
        "status": "done",
        "importance": 1,
    },
    {
        "id": 20,
        "name": "Тренинг по управлению временем",
        "start": "2023-09-01",
        "finish": "2023-09-30",
        "finished": "",
        "deadline": "2024-03-12 15:50",
        "category": "Обучение",
        "status": "wait",
        "importance": 1,
    },
    {
        "id": 21,
        "name": "Проект Delta",
        "start": "2023-07-01",
        "finish": "2024-02-28",
        "finished": "",
        "deadline": "2024-03-12 15:50",
        "category": "Разработка ПО",
        "status": "wait",
        "importance": 1,
    },
    {
        "id": 22,
        "name": "Организация выставки",
        "start": "2023-10-01",
        "finish": "2023-11-30",
        "finished": "",
        "deadline": "2024-03-12 15:50",
        "category": "Маркетинг",
        "status": "wait",
        "importance": 1,
    },
    {
        "id": 23,
        "name": "Развертывание облачной инфраструктуры",
        "start": "2023-06-01",
        "finish": "2023-10-31",
        "finished": "",
        "deadline": "2024-03-12 15:50",
        "category": "ИТ",
        "status": "wait",
        "importance": 2,
    },
    {
        "id": 24,
        "name": "Изучение потребительских предпочтений",
        "start": "2023-08-01",
        "finish": "2023-10-15",
        "finished": "2023-12-28",
        "deadline": "2024-03-12 15:50",
        "category": "Аналитика",
        "status": "fail",
        "importance": 3,
    },
    {
        "id": 25,
        "name": "Тренинг по лидерству",
        "start": "2023-11-01",
        "finish": "2023-11-30",
        "finished": "",
        "deadline": "2024-03-12 15:50",
        "category": "Обучение",
        "status": "wait",
        "importance": 0,
    },
    {
        "id": 26,
        "name": "Тренинг по управлению временем",
        "start": "2023-09-01",
        "finish": "2023-09-30",
        "finished": "",
        "deadline": "2024-03-12 15:50",
        "category": "Обучение",
        "status": "wait",
        "importance": 0,
    },
    {
        "id": 27,
        "name": "Проект Delta",
        "start": "2023-07-01",
        "finish": "2024-02-28",
        "finished": "",
        "deadline": "2024-03-12 15:50",
        "category": "Разработка ПО",
        "status": "wait",
        "importance": 0,
    },
    {
        "id": 28,
        "name": "Организация выставки",
        "start": "2023-10-01",
        "finish": "2023-11-30",
        "finished": "",
        "deadline": "2024-03-12 15:50",
        "category": "Маркетинг",
        "status": "wait",
        "importance": 0,
    },
    {
        "id": 29,
        "name": "Развертывание облачной инфраструктуры",
        "start": "2023-06-01",
        "finish": "2023-10-31",
        "finished": "",
        "deadline": "2024-03-12 15:50",
        "category": "ИТ",
        "status": "wait",
        "importance": 2,
    },
    {
        "id": 30,
        "name": "Изучение потребительских предпочтений",
        "start": "2023-08-01",
        "finish": "2023-10-15",
        "finished": "2023-12-28",
        "deadline": "2024-03-12 15:50",
        "category": "Аналитика",
        "status": "fail",
        "importance": 1,
    },
    {
        "id": 31,
        "name": "Тренинг по лидерству",
        "start": "2023-11-01",
        "finish": "2023-11-30",
        "finished": "",
        "deadline": "2024-03-12 15:50",
        "category": "Обучение",
        "status": "wait",
        "importance": 3,
    }
]);