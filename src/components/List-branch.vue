<template>
  <md-field class="field-select">
    <label for="food">Филиал</label>
    <md-select
      v-model="branch"
      name="branch"
      id="branch"
      @md-selected="onSelect"
    >
      <div
        class=""
        v-for="(option, index) in options"
        :key="index"
        :value="option.title"
      >
        <label
          class="md-subheader md-theme-default size"
          @click="netSelect(option)"
          >{{ option.title }}</label
        >

        <md-option
          v-for="item in option.companies"
          :key="item.company_id"
          :value="item.company_id"
          :disabled="item.finish"
          >{{ item.title }}</md-option
        >
      </div>
    </md-select>
  </md-field>
</template>

<script>
import { actionTypes } from "@/store/modules/storage";
export default {
  name: "AppBranchgroupSelect",

  data: () => ({
    branch: 313971,
    objId: [],
    options: [
      {
        title: "Брянск сеть",
        companies: [
          {
            title: "Подружки Кб Брянск ул. 22 Съезда КПСС, 19",
            company_id: 313971,
          },
          {
            title:
              "Подружки Кб Брянск б-р Гагарина, д. 23, ТЦ Галерея , 5-й этаж",
            company_id: 313974,
          },
        ],
      },
      {
        title: "Вологда сеть",
        companies: [
          {
            title: "Подружки Кб Вологда ул. Благовещенская, 100А",
            company_id: 313990,
          },
          {
            title: "Подружки Кб Вологда ул. Ленинградская, 93",
            company_id: 313992,
          },
        ],
      },
      {
        title: "Иваново сеть",
        companies: [
          {
            title: "Подружки КБ Иваново ул. Кузнецова, д. 11/38, 2-й этаж",
            company_id: 489393,
          },
          {
            title:
              "Подружки Кб Иваново ул. Богдана Хмельницкого, д. 44, к.2, Медцентр ЛеДамед",
            company_id: 314003,
          },
        ],
      },
      {
        title: "Казань сеть",
        companies: [
          {
            title: "Подружки Кб Казань пр-т Ибрагимова, 45 салон Раксель",
            company_id: 314009,
          },
          {
            title: "Подружки Кл Казань ул. Пушкина, 44",
            company_id: 314011,
          },
        ],
      },
      {
        title: "Калининград сеть",
        companies: [
          {
            title: "Подружки Кб Калининград ул. 9 апреля, д. 5",
            company_id: 314014,
          },
          {
            title: "Подружки Кб Калининград ул. Черняховского, 17",
            company_id: 314015,
          },
        ],
      },
      {
        title: "Калуга сеть",
        companies: [
          {
            title: "Подружки КБ Калуга, пл. Мира, д. 4/1",
            company_id: 387576,
          },
          {
            title: "Подружки Кб Калуга пл. Победы, 2",
            company_id: 314017,
          },
        ],
      },
      {
        title: "Краснодар сеть",
        companies: [
          {
            title: "Подружки КЛ Краснодар ул. Хакурате, 12",
            company_id: 314022,
          },
        ],
      },
      {
        title: "Курган сеть",
        companies: [
          {
            title: "Подружки КБ Курган, ул. Блюхера, 30В",
            company_id: 350864,
          },
          {
            title: "Подружки Кб Курган ул. Комсомольская, 26",
            company_id: 314035,
          },
        ],
      },
      {
        title: "Москва и МО сеть",
        companies: [
          {
            title: "Подружки Кл МО, г. Люберцы ул. Смирновская, 6",
            company_id: 314049,
          },
          {
            title: "Подружки Кб МО, г. Одинцово ул. Вокзальная, д. 3Б, оф. 16",
            company_id: 314051,
          },
          {
            title: "Подружки Кб МО, г. Подольск ул. Чехова, 6",
            company_id: 314052,
          },
          {
            title: "Подружки Кб МО, г. Химки, ул.Кирова, д.10к1",
            company_id: 314053,
          },
          {
            title: "Подружки Кл Москва пер. Леонтьевский, д.21/1 стр. 1",
            company_id: 314058,
          },
          {
            title: "Подружки Кл Москва ул. Александра Солженицына, 1/5",
            company_id: 314059,
          },
          {
            title: "Подружки Кл Москва ул. Сретенка, 27/29, стр. 1",
            company_id: 314065,
          },
          {
            title: "Подружки Кл Москва ул. Малая Ордынка, 12",
            company_id: 314062,
          },
          {
            title: "Подружки Кб Москва м-н Северное Чертаново, 2 к203",
            company_id: 314066,
          },
          {
            title: "Подружки Кб Москва ул. Гарибальди, 36",
            company_id: 314073,
          },
          {
            title: "Подружки Кб Москва Ореховый бульвар 45к1",
            company_id: 314077,
          },
          {
            title: "Подружки Кб Москва ул. Нижняя Красносельская, 5, стр. 1",
            company_id: 314078,
          },
          {
            title: "Подружки Кл Москва Кутузовский пр-т, 34 стр 14",
            company_id: 314056,
          },
        ],
      },
      {
        title: "Мурманск сеть",
        companies: [
          {
            title: "Подружки Кл Мурманск ул.Полярной правды, д.6",
            company_id: 483015,
          },
          {
            title: "Подружки Кб Мурманск ул. Володарского, 13",
            company_id: 314091,
          },
        ],
      },
      {
        title: "Нижний Новгород сеть",
        companies: [
          {
            title: "Подружки Кб Нижний Новгород Верхневолжская наб., 2Б",
            company_id: 314109,
          },
          {
            title: "Подружки Кл Нижний Новгород ул. Сергиевская, 8",
            company_id: 314183,
          },
        ],
      },
      {
        title: "Оренбург сеть",
        companies: [
          {
            title: "Подружки Кл Оренбург ул. Ленинская, 65",
            company_id: 314130,
          },
          {
            title: "Подружки Кб Оренбург ул. Салмышская, 34 к5",
            company_id: 314132,
          },
        ],
      },
      {
        title: "Псков сеть",
        companies: [
          {
            title: "Подружки Кб Псков Советская наб., 6",
            company_id: 314140,
          },
          {
            title:
              "Подружки Кб Псков, ул. Кузбасской Дивизии, 26а МедЦентр Знахарь",
            company_id: 314047,
          },
        ],
      },
      {
        title: "Санкт-Петербург сеть",
        companies: [
          {
            title: "Подружки Кл Санкт-Петербург ул. Кирочная, 30",
            company_id: 314134,
          },
          {
            title: "Подружки Кл Санкт-Петербург ул. Подольская, 23",
            company_id: 314136,
          },
          {
            title: "Подружки Кб Санкт-Петербург Ленинский пр-т, 147 к2",
            company_id: 314148,
          },
          {
            title: "Подружки Кб Санкт-Петербург наб. реки Карповки, 13 лит.А",
            company_id: 314150,
          },
          {
            title: "Подружки Кб Санкт-Петербург, Невский проспект, д. 140",
            company_id: 314151,
          },
          {
            title: "Подружки Кб Санкт-Петербург ул. Веденеева, 2",
            company_id: 314155,
          },
        ],
      },

      {
        title: "Саранск сеть",
        companies: [
          {
            title: "Подружки КБ Саранск , ул. Богдана Хмельницкого 75",
            company_id: 350860,
          },
          {
            title: "Подружки Кб Саранск ул. Советская, 31",
            company_id: 314138,
          },
        ],
      },

      {
        title: "Другое",
        companies: [
          {
            title: "Подружки Кб Альметьевск, ул. Ленина, 43 (Закрыт)",
            finish: true,
            company_id: 348134,
          },
          {
            title: "Подружки КБ Анапа, ул. Парковая, 84а (Закрыт)",
            finish: true,
            company_id: 425950,
          },
          {
            title: "Подружки КЛ Архангельск ул. Розы Люксембург, 3",
            company_id: 313958,
          },
          {
            title: "Подружки Кл Астрахань ул. Бабушкина, 24",
            company_id: 313965,
          },
          {
            title: "Подружки Кб Барнаул ул. Попова, 63",
            company_id: 313966,
          },
          {
            title: "Подружки Кл Белгород ул. Богдана Хмельницкого, 26",
            company_id: 313968,
          },
          {
            title: "Подружки Кб Бишкек пр-т Манаса, 30",
            company_id: 313970,
          },
          {
            title: "Подружки Кб Великий Новгород ул. Новолучанская, 6/5",
            company_id: 313977,
          },
          {
            title: "Подружки Кл Владивосток ул. Уборевича, 10а",
            company_id: 313983,
          },
          {
            title: "Подружки Кл Владимир, ул. Гагарина, 8",
            company_id: 313979,
          },

          {
            title: "Подружки Кл Волгоград ул. Гагарина, 16",
            company_id: 313987,
          },
          {
            title: "Подружки Кл Воронеж пр-т Революции, 9а",
            company_id: 313995,
          },
          {
            title: "Подружки Кб Геленджик ул. Ленина, 1",
            company_id: 313998,
          },
          {
            title: "Подружки Кб Евпатория, пр-т Победы, 4",
            company_id: 348135,
          },
          {
            title: "Подружки Кл Екатеринбург ул. Декабристов, 16/18б",
            company_id: 314002,
          },
          {
            title: "Подружки КБ Ижевск, Льва Толстого, 24 ЗАКРЫВАЕТСЯ",
            company_id: 422714,
          },
          {
            title: "Подружки Кл Ижевск, ул. Орджоникидзе, д.49",
            company_id: 314004,
          },
          {
            title: "Подружки Кл Иркутск ул. Лыткина, 31",
            company_id: 314005,
          },
          {
            title: "Подружки КБ Йошкар - Ола, ул. Карла Маркса, 101А",
            company_id: 350856,
          },
          {
            title: "Подружки Кб Кемерово, ул. Рукавишникова, 22",
            company_id: 314018,
          },
          {
            title: "Подружки КБ Керчь, ул. Кирова, 22а (Закрыт)",
            finish: true,
            company_id: 425951,
          },
          {
            title: "Подружки Кб Киров ул. Преображенская, 65",
            company_id: 314020,
          },

          {
            title:
              "Подружки Кб Кострома ул Советская, дом 6, пом. 6, комната 12",
            company_id: 348136,
          },
          {
            title: "Подружки Кл Красноярск ул. Карла Маркса, 58",
            company_id: 314025,
          },
          {
            title: "Подружки Кл Курск ул. Кати Зеленко, 26",
            company_id: 314039,
          },
          {
            title: "Подружки Кл Липецк ул. Терешковой, 24",
            company_id: 314042,
          },
          {
            title: "Подружки Кб Набережные Челны, проспект Сююмбике,33",
            company_id: 314094,
          },
          {
            title: "Подружки Кб Нефтеюганск 12-ый Микрорайон, 18",
            company_id: 314098,
          },
          {
            title: "Подружки Кб Нижневартовск ул. Северная, 3Б",
            company_id: 314103,
          },
          {
            title: "Подружки Кб Нижний Тагил Красноармейская, д. 79",
            company_id: 350857,
          },
          {
            title: "Подружки Кб Новороссийск наб. Адмирала Серебрякова, 53А",
            company_id: 314114,
          },
          {
            title: "Подружки Кл Новосибирск ул. Кропоткина, 102",
            company_id: 314120,
          },
          {
            title: "Подружки Кб Обнинск, ул. Белкинская, 2",
            company_id: 350865,
          },
          {
            title: "Подружки Кл Омск ул. Пушкина, 26",
            company_id: 314123,
          },
          {
            title: "Подружки Кб Орел, Карачевское шоссе, д. 79Б",
            company_id: 314067,
          },
          {
            title:
              "Подружки Кб Орск, ул. Ленинского комсомола 43М (корпус 3), ТДЦ Ленком",
            company_id: 350861,
          },
          {
            title: "Подружки КБ Ош, Пр. Масалиева, 71, Клиника Азиза",
            company_id: 422715,
          },
          {
            title: "Подружки КБ Пенза, ул. Володарского, 67",
            company_id: 350862,
          },
          {
            title: "Подружки Кб Пенза ул. Лермонтова 34",
            company_id: 314133,
          },

          {
            title: "Подружки Кл Пермь ул. Советская, 21",
            company_id: 314135,
          },
          {
            title: "Подружки Кб Петрозаводск пр. Ленина, д.21, офис 258",
            company_id: 314137,
          },
          {
            title: "Подружки Кл Ростов-на-Дону пер. Островского, 58",
            company_id: 314142,
          },
          {
            title: "Подружки Кл Рязань ул. Циолковского, 6",
            company_id: 314144,
          },
          {
            title: "ППодружки Кл Самара Московское шоссе лит. Б",
            company_id: 314146,
          },
          {
            title: "Подружки Кл Саратов ул. Комсомольская, 28/30",
            company_id: 314143,
          },

          {
            title: "Подружки Кл Севастополь ул. Ленина, 64",
            company_id: 314145,
          },

          {
            title: "Подружки Кб СИ",
            company_id: 314156,
          },
          {
            title: "Подружки Кл Симферополь ул. Козлова, 17",
            company_id: 314095,
          },
          {
            title: "Подружки Кб Смоленск, ул.Тенишевой, 22",
            company_id: 313963,
          },
          {
            title: "Подружки Кл Сочи ул. Московская, 3 стр 4",
            company_id: 314106,
          },
          {
            title: "Подружки Кб Ставрополь ул. Ленина, 328/7",
            company_id: 314112,
          },
          {
            title: "Подружки Кб Ставрополь ул. Спартака д.2А (ЗАКРЫТ)",
            finish: true,
            company_id: 392681,
          },
          {
            title:
              "Подружки Кб Старый Оскол микрорайон Макаренко, 38 салон Эйфория",
            company_id: 314118,
          },
          {
            title: "Подружки Кб Стерлитамак, ул Худайбердина, 101в.",
            company_id: 350858,
          },
          {
            title: "Подружки Кл Сургут ул. Лермонтова, 6",
            company_id: 314122,
          },
          {
            title: "Подружки Кб Сыктывкар Октябрьский пр-т, 118/1",
            company_id: 314101,
          },
          {
            title: "Подружки Кл Таганрог Гоголевский пер., 22",
            company_id: 314108,
          },

          {
            title: "Подружки Кб Тамбов ул. Коммунальная, 20/Носовская, 5",
            company_id: 314113,
          },
          {
            title: "Подружки Кл Тверь ул. Вольного Новгорода, 13",
            company_id: 314116,
          },

          {
            title: "Подружки Кл Тольятти, Ленинский пр-т, 1в",
            company_id: 314121,
          },
          {
            title: "Подружки Кб Томск ул. Сибирская, 31",
            company_id: 314089,
          },
          {
            title: "Подружки Кл Тула ул. Первомайская, 1/8",
            company_id: 314092,
          },
          {
            title: "Подружки Кл Тюмень ул. Дзержинского, 31",
            company_id: 314096,
          },
          {
            title: "Подружки Кб Улан-Удэ ул. Павлова 59А",
            company_id: 314100,
          },
          {
            title: "Подружки Кл Ульяновск ул. Гагарина, 1/35",
            company_id: 314111,
          },
          {
            title: "Подружки Кл Уфа ул. Ленина, 43",
            company_id: 314102,
          },
          {
            title: "Подружки Кл Хабаровск ул. Запарина, 104",
            company_id: 314107,
          },

          {
            title: "Подружки Кб Ханты-Мансийск, ул. Крупской, 26/30",
            company_id: 314110,
          },
          {
            title: "Подружки Кб Чебоксары ул. Петрова С.П. , д. 5",
            company_id: 314115,
          },

          {
            title: "Подружки Кл Челябинск ул. Работниц, 72",
            company_id: 314159,
          },
          {
            title:
              "Подружки Кб Череповец Шекснинский пр-т, 49, центр Совершенство",
            company_id: 314160,
          },
          {
            title: "Подружки Кл Чита ул. Курнатовского, 8",
            company_id: 314162,
          },
          {
            title: "Подружки Кб Энгельс ул. Площадь Ленина, 32",
            company_id: 314163,
          },

          {
            title: "Подружки Кб Ялта, ул. Московская, 3",
            company_id: 350855,
          },
          {
            title: "Подружки Кл Ярославль ул. Большая Октябрьская, 45",
            company_id: 314171,
          },
        ],
      },
    ],
  }),
  methods: {
    onSelect() {
      // console.log(this.branch);
      this.$store
        .dispatch(actionTypes.getCompanieItem, this.branch)
        .then(() => {
          // console.log("Таблица по ID", resp);
        })
        .catch((er) => {
          console.log("Ошибка", er);
        });
    },
    netSelect(option) {
      option.companies.forEach((option) => {
        this.objId.push(option.company_id);
      });
      const apiUrlWithParams = `net?companies_ids=${this.objId}&net_title=${option.title}`;
      // if (this.branch) {
      this.$store
        .dispatch(actionTypes.getCompanieNet, {
          apiUrl: apiUrlWithParams,
        })
        .then(() => {
          // console.log("Таблица по Филиалу", resp);
        })
        .catch((er) => {
          console.log("Ошибка", er);
        });
      // }
    },
  },
  mounted() {
    this.onSelect();
  },
};
</script>
