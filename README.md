# train-characteristics

### Ссылка на прототип:

[store-cart-vobiryukov12.vercel.app](https://store-cart-vobiryukov12.vercel.app/)

## Описание
Мини-приложение на React для отображения и редактирования информации о поездах

### Технологии используемые на проекте:
[![Skills](https://skillicons.dev/icons?i=react,ts,redux,scss,vite)](https://skillicons.dev)

### В проекте используется:
- Данные поздов из API
- Redux Toolkit для хранения состояния
- Vite для сборки
- Typescript
- JSDoc для документирования кода
- SCSS modules
- Линтеры ESLint, Stylelint и Prettier для форматирования кода
- Алиасы для более коротких и читаемых импортов

В данных из API нет полей id, поэтому после получения данных для каждого объекта поезда и характеристик добавляется поле id

### Возможности приложения:

- При клике на строку с поездом появляться таблица с характеристиками этого поезда
- Все ячейки таблицы характеристик доступны для редактирования
- У всех полей есть валидация, если есть значения, которые не проходят валидацию, то они подсвечиваются красным, а кнопка «Отправить данные» становится неактивной
