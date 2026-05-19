export{};

// Задание №3
function sumNumbers(a: number, b: number): number {
  return a + b;
}

// Задание №4
let status: 'loading' | 'success' | 'error';

// Задание №5
let textFormat: 'uppercase' | 'lowercase' | 'capitalize';

// Задание №6
interface IUser {
  name: string;
  surname: string;
  age: number;
  city: string;
  isHuman?: boolean;
}

let user: IUser = {
  name: 'Alex',
  surname: 'Page',
  age: 40,
  city: 'London',
};

// Задание №7
interface IDoctor extends IUser {
  medicalEducation: boolean;
}

let doctor: IDoctor = {
  name: 'Muhammad',
  surname: 'Aliev',
  age: 30,
  city: 'Medina',
  medicalEducation: true,
};

// Задание №8
type StringFormat = 'uppercase' | 'lowercase' | 'capitalize';

function formatStringVariant(str: string, format: StringFormat): string {
  if (format === 'uppercase') return str.toUpperCase();
  else if (format === 'lowercase') return str.toLowerCase();
  else if (format === 'capitalize') return str[0].toUpperCase()+ str.slice(1);
  else return str;
}

// Задание №9
function removeCharFromString(str: string, char: string): string {
  return str.split(char).join("");
}

// Задание №10
const users: IUser[] = [
  {
    name: 'Alex',
    surname: 'Page',
    age: 40,
    city: 'London',
  },
  {
    name: 'Roberto',
    surname: 'Pablo',
    age: 48,
    city: 'Chicago'
  },
  {
    name: 'Mike',
    surname: 'Jones',
    age: 52,
    city: 'USA',
  }
];
const filteredUsers = users.filter((item) => item.age > 47)
