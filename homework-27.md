Задача №1. Синглтон или нет?
1 экземпляр providedIn: 'root' создаёт один общий сервис для всего приложения. Поэтому оба компонента получают один и тот же экземпляр.

Задача №2. Локальный провайдер
2 экземпляра у каждого app-child свой CounterService Компонентов два значит и сервисов два

Задача №3. Какой экземпляр получит компонент?
ChildComponent получит экземпляр от ParentComponent, у ParentComponent есть свой LoggerService и дочерний компонент берёт его у родителя

Задача №4. использовать существующий
1 экземпляр useExisting использует уже созданный LoggerService, новый не создаётся.

Задача №5. useFactory
При первом Angular вызывает useFactory, когда сервис впервые запрашивают.

Задача №6. Мульти провайдер
А и В multi: true собирает несколько значений одного токена в массив.

Задача №7. Дополнительно
null

Задача №8. Self
Будет ошибка

Задача №9. SkipSelf
экземпляр ParentComponent

Задача №10. Нет регистрации
 будет ошибка ApiService нигде не зарегистрирован поэтому Angular не может его создать.

Задача №11.
Один

Задача №12.

1 Один из root и один у HeaderComponent.

2 Свой экземпляр из providers.

3 Экземпляр из root.

4 Тоже экземпляр из root.

5 UserCardComponent DashboardComponent  AppComponent  root Injector

Задача №13.

A B C D LoggerService Angular начинает с A, потом смотрит, что ему нужен B, затем C, D и LoggerService Создаёт их по очереди и сохраняет, чтобы потом не создавать заново.

Задача №14. 
Сначала 0 сервисов. После inject(UserService) появятся 3 объекта.

Задача №15. 

1. ApiService  providedIn: 'root'
   Один сервис нужен всему приложению.

2. AuthService providedIn: 'root'
   Текущий пользователь должен быть общим для приложения.

3. CartService providedIn: 'root'
   Корзина должна быть общей для всего приложения.

4. ProductFilterService providers компонента
   На каждой странице нужны свои фильтры, а после ухода со страницы они исчезают.

5. NotificationService providedIn: 'root'
   Уведомления могут понадобиться в разных местах приложения.

6. ThemeService  providedIn: 'root'
   Все страницы должны использовать одну тему.

7. DashboardStatisticsService providers компонента
   Он нужен только Dashboard и перестаёт использоваться после ухода со страницы.

8. UserTableStateService  providers компонента
   Состояние нужно только внутри страницы пользователей.

9. ModalService  providedIn: 'root'
   Любой компонент должен иметь доступ к модальным окнам.

10. LoggerService** useFactory
    Factory может выбрать, что использовать: логирование в консоль или отправку на сервер.

11. AppConfig InjectionToken + useValue
    Это готовые настройки приложения.

12. CurrencyFormatter useValue
    Здесь можно передать готовый объект с настройками формата.

13. AnalyticsService — useFactory
    Factory может создать сервис только когда аналитика включена.




