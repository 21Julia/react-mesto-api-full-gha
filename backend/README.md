[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд

___

## Описание проекта:

*О проекте:*

1. Данный проект создавался с целью закрепить пройденный материал и отработать навыки, полученные в теоретической части спринта. 

2. Данный проект представляет собой Backend-часть приложения Mesto.

3. В проекте настроена инфраструктура бэкенд-части приложения, создан сервер, который принимает и возвращает данные на клиентскую часть приложения — создан REST API. 

4. Использованы следующие технологии:
    * cервер был создан при помощи фреймворка *Express*;
    * настроены маршруты и контроллеры при помощи *Express*;
    * проект подключен к серверу MongoDB по адресу **mongodb://127.0.0.1:27017/mestodb**;
    * использована специальная ODM-библиотека *Mongoose*, при помощи которой были созданы схемы и модели пользователя и карточки;
    * использован мидлвэр *body-parser*;
    * настроена обработка ошибок возникающих при запросах;
    * настроена централизованная обработка ошибок;
    * настроена валидация приходящих на сервер запросов при помощи библиотек *Joi* и *celebrate*;
    * фронтенд часть приложения стала связана с авторизацией на стороне сервера;
    * создаем и проверяем токены на стороне сервера.

## Директории:

  `/routes` — папка с файлами роутера;   
  `/controllers` — папка с файлами контроллеров пользователя и карточки;  
  `/models` — папка с файлами описания схем пользователя и карточки.  

## Команды для запуска проекта:

  `npm run start` — запускает сервер;  
  `npm run dev` — запускает сервер с hot-reload.  

## Ссылка на репозиторий в GitHub:

[https://github.com/21Julia/express-mesto-gha]