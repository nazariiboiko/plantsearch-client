export const type = () => {
  return [
    { id: 'Tree', label: 'Дерево', value: 'Дерево' },
    { id: 'SmallTree', label: 'Невелике дерево', value: 'Невелике дерево чи великий кущ' },
    { id: 'Shrub', label: 'Кущ', value: 'Кущ' },
    { id: 'Semi-shrub', label: 'Напівкущ', value: 'Напівкущ' },
    { id: 'Perennial', label: 'Багаторічник', value: 'Багаторічник' },
    { id: 'Climber', label: 'Ліана', value: 'Ліана' },
  ];
};


export const habitus = () => {
  return [
    { id: 'Delta-shaped', label: 'Дельтовидна', value: 'дельтовидна' },
    { id: 'Cushion', label: 'Вюнка', value: 'вюнка' },
    { id: 'Columnar', label: 'Колоновидна', value: 'колоновидна' },
    { id: 'Globose', label: 'Кулеподібна', value: 'кулеподібна' },
    { id: 'Globose-flattened', label: 'Кулеподібно-сплющена', value: 'кулеподібно-сплющена' },
    { id: 'Oval', label: 'Овальна', value: 'овальна' },
    { id: 'Pyramidal', label: 'Пірамідальна', value: 'пірамідальна' },
    { id: 'Weeping', label: 'Плакуча', value: 'плакуча' },
    { id: 'Prostrate', label: 'Розпростерта', value: 'розпростерта' },
    { id: 'Oblong', label: 'Яйцевидна', value: 'яйцевидна' },
  ];
};


export const color = () => {
  return [
    { id: 'Shades of Blue', label: 'Відтінки голубого', value: 'Відтінки голубого' },
    { id: 'Shades of Yellow', label: 'Відтінки жовтого', value: 'Відтінки жовтого' },
    { id: 'Shades of Green', label: 'Відтінки зеленого', value: 'Відтінки зеленого' },
    { id: 'Shades of Purple', label: 'Відтінки фіолетового', value: 'Відтінки фіолетового' },
    { id: 'Shades of Red', label: 'Відтінки червоного', value: 'Відтінки червоного' },
  ];
};


export const summerColor = () => {
  return [
    { id: 'Burgundy', label: 'Бордовий', value: 'sum_борд' },
    { id: 'Glossy', label: 'Глянцевий', value: 'sum_глянц' },
    { id: 'Blue', label: 'Голубий', value: 'sum_голуб' },
    { id: 'Yellow', label: 'Жовтий', value: 'sum_жовт' },
    { id: 'Green', label: 'Зелений', value: 'sum_зелен' },
    { id: 'Golden', label: 'Золотистий', value: 'sum_золот' },
    { id: 'Brown', label: 'Коричневий', value: 'sum_корич' },
    { id: 'Cream', label: 'Кремовий', value: 'sum_крем' },
    { id: 'Lemon', label: 'Лимонний', value: 'sum_лимон' },
    { id: 'Copper', label: 'Мідний', value: 'sum_мідн' },
    { id: 'Olive', label: 'Оливковий', value: 'sum_оливк' },
    { id: 'Orange', label: 'Оранжевий', value: 'sum_оранж' },
    { id: 'Purple', label: 'Пурпурний', value: 'sum_пурпур' },
    { id: 'Reddish', label: 'Рижий', value: 'sum_риж' },
    { id: 'Pink', label: 'Рожевий', value: 'sum_рож' },
    { id: 'Salmon', label: 'Салатовий', value: 'sum_салат' },
    { id: 'Blue', label: 'Синій', value: 'sum_син' },
    { id: 'Gray', label: 'Сірий', value: 'sum_сір' },
    { id: 'Silver', label: 'Срібний', value: 'sum_сріб' },
    { id: 'Dark', label: 'Темний', value: 'sum_темн' },
    { id: 'Violet', label: 'Фіолетовий', value: 'sum_фіол' },
    { id: 'Red', label: 'Червоний', value: 'sum_черв' },
  ];
};


export const autumnColor = () => {
  return [
    { id: 'Crimson', label: 'Багровий', value: 'aut_багр' },
    { id: 'White', label: 'Білий', value: 'aut_біл' },
    { id: 'Burgundy', label: 'Бордовий', value: 'aut_борд' },
    { id: 'Bronze', label: 'Бронзовий', value: 'aut_бронз' },
    { id: 'Blue', label: 'Голубий', value: 'aut_голуб' },
    { id: 'Yellow', label: 'Жовтий', value: 'aut_жовт' },
    { id: 'Green', label: 'Зелений', value: 'aut_зелен' },
    { id: 'Golden', label: 'Золотистий', value: 'aut_золот' },
    { id: 'Carmine', label: 'Карміновий', value: 'aut_кармін' },
    { id: 'Brown', label: 'Коричневий', value: 'aut_корич' },
    { id: 'Copper', label: 'Мідний', value: 'aut_мід' },
    { id: 'Orange', label: 'Оранжевий', value: 'aut_оранж' },
    { id: 'Purple', label: 'Пурпурний', value: 'aut_пурпур' },
    { id: 'Gray', label: 'Сірий', value: 'aut_сір' },
    { id: 'Dark', label: 'Темний', value: 'aut_темн' },
    { id: 'Violet', label: 'Фіолетовий', value: 'aut_фіол' },
    { id: 'Red', label: 'Червоний', value: 'aut_черв' },
  ];
};


export const lighting = () => {
  return [
    { id: 'Sun', label: 'Сон', value: 'Сон' },
    { id: 'Partial Sun', label: 'Напівсон', value: 'Напівсон' },
    { id: 'Shade', label: 'Тінь', value: 'Тінь' },
  ];
};


export const frostResistance = () => {
  return [
    { id: 'Frost-resistant', label: 'Морозостійкий', value: 'морозостійкий' },
    { id: 'Moderately Frost-resistant', label: 'Середньої морозостійкості', value: 'середньої морозостійкості' },
    { id: 'Not Frost-resistant', label: 'Неморозостійкий', value: 'неморозостійкий' },
  ];
};


export const floweringColor = () => {
  return [
    { id: 'Crimson', label: 'Багряний', value: 'flo_багр' },
    { id: 'Beige', label: 'Бежевий', value: 'flo_беж' },
    { id: 'White', label: 'Білий', value: 'flo_біл' },
    { id: 'Burgundy', label: 'Бордовий', value: 'flo_борд' },
    { id: 'Cherry', label: 'Вишневий', value: 'flo_вишн' },
    { id: 'Sky Blue', label: 'Голубий', value: 'flo_голуб' },
    { id: 'Yellow', label: 'Жовтий', value: 'flo_жовт' },
    { id: 'Green', label: 'Зелений', value: 'flo_зелен' },
    { id: 'Gold', label: 'Золотий', value: 'flo_золот' },
    { id: 'Carmine', label: 'Карміновий', value: 'flo_кармін' },
    { id: 'Brown', label: 'Коричневий', value: 'flo_корич' },
    { id: 'Lavender', label: 'Лавандовий', value: 'flo_лаванд' },
    { id: 'Lilac', label: 'Ліловий', value: 'flo_ліло' },
    { id: 'Raspberry', label: 'Малиновий', value: 'flo_малин' },
    { id: 'Orange', label: 'Оранжевий', value: 'flo_оранж' },
    { id: 'Purple', label: 'Пурпуний', value: 'flo_пурпур' },
    { id: 'Pink', label: 'Рожевий', value: 'flo_рож' },
    { id: 'Rose', label: 'Розовий', value: 'flo_роз' },
    { id: 'Ruby', label: 'Рубіновий', value: 'flo_рубін' },
    { id: 'Blue', label: 'Синій', value: 'flo_син' },
    { id: 'Violet', label: 'Фіолетовий', value: 'flo_фіол' },
    { id: 'Red', label: 'Червоний', value: 'flo_черв' },
    { id: 'Chocolate', label: 'Шоколадний', value: 'flo_шокол' },
  ];
};


export const floweringPeriod = () => {
  return [
    { id: 'January', label: 'Січень', value: 'Січень' },
    { id: 'February', label: 'Лютий', value: 'Лютий' },
    { id: 'March', label: 'Березень', value: 'Березень' },
    { id: 'April', label: 'Квітень', value: 'Квітень' },
    { id: 'May', label: 'Травень', value: 'Травень' },
    { id: 'June', label: 'Червень', value: 'Червень' },
    { id: 'July', label: 'Липень', value: 'Липень' },
    { id: 'August', label: 'Серпень', value: 'Серпень' },
    { id: 'September', label: 'Вересень', value: 'Вересень' },
    { id: 'October', label: 'Жовтень', value: 'Жовтень' },
    { id: 'November', label: 'Листопад', value: 'Листопад' },
    { id: 'December', label: 'Грудень', value: 'Грудень' },
  ];
};


export const soilMoisture = () => {
  return [
    { id: 'Hygrophyte', label: 'Гігрофіт', value: 'Гігрофіт' },
    { id: 'Xerophyte', label: 'Ксерофіт', value: 'Ксерофіт' },
    { id: 'Mesohygrophite', label: 'Мезогітрофіт', value: 'Мезогітрофіт' },
    { id: 'Mesoxerophyte', label: 'Мезоксерофіт', value: 'Мезоксерофіт' },
    { id: 'Mesophyte', label: 'Мезофіт', value: 'Мезофіт' },
  ];
};


export const nutrition = () => {
  return [
    { id: 'Eutrophic', label: 'Мегатроф', value: 'Мегатроф' },
    { id: 'Mesotrophic', label: 'Мезотроф', value: 'Мезотроф' },
    { id: 'Oligotrophic', label: 'Оліготроф', value: 'Оліготроф' },
  ];
};


export const ph = () => {
  return [
    { id: 'Acidic', label: 'Кислий', value: 'Кислий' },
    { id: 'Alkaline', label: 'Лужний', value: 'Лужний' },
    { id: 'Neutral', label: 'Нейтральний', value: 'Нейтральний' },
    { id: 'Slightly acidic', label: 'Злегка кислий', value: 'Злегка кислий' },
    { id: 'Slightly alkaline', label: 'Злегка лужний', value: 'Злегка лужний' },
  ];
};


export const hardy = () => {
  return [
    { id: 'City conditions resistant', label: 'Витримує міські умови', value: 'Витримує міські умови' },
    { id: 'Adult specimens damaged by snow', label: 'Дорослі екземпляри пошкоджуються снігом', value: 'Дорослі екземпляри пошкоджуються снігом' },
    { id: 'Support required', label: 'Необхідна опора', value: 'Необхідна опора' },
    { id: 'Need to prune last year\'s growth', label: 'Необхідно обстригати минулорічний приріст', value: 'Необхідно обстригати минулорічний приріст' },
    { id: 'Pruning after flowering', label: 'Обрізка після цвітіння', value: 'Обрізка після цвітіння' },
    { id: 'Requires sheltered locations', label: 'Потребує захищених місць', value: 'Потребує захищених місць' },
    { id: 'Requires winter cover', label: 'Потребує укриття на зиму', value: 'Потребує укриття на зиму' },
  ];
};



export const placeRecommendation = () => {
  return [
    { id: 'Alley tree', label: 'Алейне дерево', value: 'Алейне дерево' },
    { id: 'Alpine slides', label: 'Альпійські гірки', value: 'Альпійські гірки' },
    { id: 'Alpinarium', label: 'Альпінарій', value: 'Альпінарій' },
    { id: 'Border', label: 'Бордюр', value: 'Бордюр' },
    { id: 'Large gardens', label: 'Великі сади', value: 'Великі сади' },
    { id: 'Heather gardens', label: 'Вересові сади', value: 'Вересові сади' },
    { id: 'Ground cover', label: 'Грунтопокривний', value: 'Грунтопокривний' },
    { id: 'Hedge', label: 'Жива огорожа', value: 'Жива огорожа' },
    { id: 'Mixed compositions', label: 'Змішані композиції', value: 'Змішані композиції' },
    { id: 'Flower bed', label: 'Клумба', value: 'Клумба' },
    { id: 'Color compositions', label: 'Колористичні композиції', value: 'Колористичні композиції' },
    { id: 'Container', label: 'Контейнер', value: 'Контейнер' },
    { id: 'Small gardens', label: 'Невеликі сади', value: 'Невеликі сади' },
    { id: 'Single planting in the lawn', label: 'Одиночна посадка на газоні', value: 'Одиночна посадка на газоні' },
    { id: 'Parks', label: 'Парки', value: 'Парки' },
    { id: 'Rockery', label: 'Рокарій', value: 'Рокарій' },
    { id: 'Solitary planting', label: 'Солітерна посадка', value: 'Солітерна посадка' },
    { id: 'Slope reinforcement', label: 'Укріплення склонів', value: 'Укріплення склонів' },
    { id: 'Cemetery', label: 'Цвинтар', value: 'Цвинтар' },
    { id: 'Espalier', label: 'Шпалера', value: 'Шпалера' },
    { id: 'Japanese gardens', label: 'Японські сади', value: 'Японські сади' },
  ];
};

export const zoning = () => {
  return [
    { id: '1', label: '1', value: '1' },
    { id: '2', label: '2', value: '2' },
    { id: '3', label: '3', value: '3' },
    { id: '4', label: '4', value: '4' },
    { id: '5', label: '5', value: '5' },
    { id: '5A', label: '5А', value: '5А' },
    { id: '5B', label: '5В', value: '5В' },
    { id: '6A', label: '6А', value: '6А' },
    { id: '6B', label: '6В', value: '6В' },
    { id: '7A', label: '7А', value: '7А' },
    { id: '7B', label: '7В', value: '7В' },
    { id: '8', label: '8', value: '8' },
  ];
};

export const evergreen = () => {
  return [
    { id: 'Yes', label: 'Так', value: 'Так' },
    { id: 'No', label: 'Ні', value: 'Ні' },
  ];
};

export const growthRate = () => {
  return [
    { id: 'Fast', label: 'Швидкий', value: 'швидкий' },
    { id: 'Medium', label: 'Середній', value: 'середній' },
    { id: 'Slow', label: 'Повільний', value: 'повільний' },
  ];
};

export const allCriterias = () => {
  return [
    { id: 'plantType', label: 'Вид', value: type() },
    { id: 'habitus', label: 'Габітус', value: habitus() },
    { id: 'color', label: 'Забарвлення', value: color() },
    { id: 'summerColor', label: 'Літнє забарвлення', value: summerColor() },
    { id: 'autumnColor', label: 'Осіннє забарвлення', value: autumnColor() },
    { id: 'floweringColor', label: 'Колір цвітіння', value: floweringColor() },
    { id: 'floweringPeriod', label: 'Період цвітіння', value: floweringPeriod() },
    { id: 'lighting', label: 'Освітлення', value: lighting() },
    { id: 'frostResistance', label: 'Морозостійкість', value: frostResistance() },
    { id: 'soilMoisture', label: 'Вологість грунту', value: soilMoisture() },
    { id: 'nutrition', label: 'Живлення', value: nutrition() },
    { id: 'ph', label: 'рН грунту', value: ph() },
    { id: 'hardy', label: 'Витривалість', value: hardy() },
    { id: 'recommendation', label: 'Місце посадки', value: placeRecommendation() },
    { id: 'zoning', label: 'Зонування', value: zoning() },
    { id: 'evergreen', label: 'Вічнозелене листя', value: evergreen() },
    { id: 'growthRate', label: 'Темп просту', value: growthRate() },
  ];
};

export const customCriterias = () => {
  return [
    { id: 'plantType', label: 'Вид', value: type() },
    { id: 'habitus', label: 'Габітус', value: habitus() },
    { id: 'floweringPeriod', label: 'Період цвітіння', value: floweringPeriod() },
    { id: 'lighting', label: 'Освітлення', value: lighting() },
    { id: 'frostResistance', label: 'Морозостійкість', value: frostResistance() },
    { id: 'soilMoisture', label: 'Вологість грунту', value: soilMoisture() },
    { id: 'nutrition', label: 'Живлення', value: nutrition() },
    { id: 'ph', label: 'рН грунту', value: ph() },
    { id: 'hardy', label: 'Витривалість', value: hardy() },
    { id: 'recommendation', label: 'Місце посадки', value: placeRecommendation() },
    { id: 'zoning', label: 'Зонування', value: zoning() },
    { id: 'evergreen', label: 'Вічнозелене листя', value: evergreen() },
    { id: 'growthRate', label: 'Темп просту', value: growthRate() },
  ];
}
