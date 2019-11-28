function f(x :number, y :number) {
    return x*y
}

interface Interval {
    a :number,
    b :number,
}

let x_a_b :Interval = {
    a: 0,
    b: 2,
};
let y_c_d :Interval = {
    a: 0,
    b: 2,
};

function subSimpson(f :Function, a :number, b :number, c :number, d :number) :number{
    return (16 * f((b + a) / 2, (d + c) / 2 ) + 4 * f((b + a) / 2, d) + 4 * f((b + a) / 2, c) + 4 * f(b, (d + c) / 2) +
        f(b, d) + f(b, c) + 4 * f(a, (d + c) / 2) + f(a, b) + f(a, c)) * (b - a) * (d - c) / 36
}

const nem :number = 10;

let h_x :Array<number> = [];
let h_y :Array<number> = [];
let delta_x :number = (x_a_b.b - x_a_b.a) / nem;
let delta_y :number = (y_c_d.b - y_c_d.a) / nem;
for (let i = 0; i < nem; i++) {
    h_x.push(x_a_b.a + delta_x * i);
    h_y.push(y_c_d.a + delta_y * i);
}

let answer :number = 0;

for (let i = 0; i < nem; i++) {
    for (let j = 0; j < nem; j++) {
        answer += subSimpson(f, h_x[i], h_x[i] + delta_x, h_y[j], h_y[j] + delta_y);
    }
}

console.log(answer);
