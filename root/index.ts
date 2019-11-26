let x :Array<number> = [0, 1];
let f_x :Array<number> = [0, 1];
if (x.length != f_x.length) throw new Error('wrong points');
let n: number = x.length;

function F(l :number) :number {
    return f_x[x.indexOf(l)];
}

function scalar(f:Function, g:Function) : number {
    let answer :number = 0;
    for (let i = 0; i < n; i++) {
        answer += f(x[i]) * g(x[i]);
    }
    return answer;
 }

function phi(i :number) :Function {
    return function (x :number) :number {
        return Math.pow(x, i);
    }
}

function squareRootMethod(A: Array<Array<number>>, B: Array<number>) :Array<number> {
    let G :Array<Array<number>> = Array(A.length).fill(0).map(() => Array(A.length).fill(0));
    G[0][0] = Math.sqrt(A[0][0]);
    const n: number = A.length;
    for (let i = 1; i < n; i++) {
        G[0][i] = A[0][i] / G[0][0]
    }
    for (let i = 1; i < n; i++) {
        let tempSum: number = 0;
        for (let k = 0; k < i - 1; k++) {
            tempSum += G[k][i] * G[k][i];
        }
        G[i][i] = Math.sqrt(A[i][i] - tempSum);
    }
    for (let m = 0; m < n; m++) {
        for (let s = 0; s < n && m < s; s++) {
            let tempSum: number = 0;
            for (let p = 0; p < m - 1; p++) {
                tempSum += G[p][m]* G[p][s];
            }
            G[m][s] = (A[m][s] - tempSum);
        }
    }

    let Y :Array<number> = Array(n).fill(0);
    Y[0] = B[0] / G[0][0];
    for (let i = 1; i < n; i++) {
        let tempSum: number = 0;
        for (let k = 0; k < n - 1; k++) {
            tempSum += G[k][i] * Y[k];
        }
        Y[i] = (B[i] - tempSum) / G[i][i];
    }
    let X: Array<number> = Array(n).fill(0);
    X[n - 1] = Y[n - 1] / G[n - 1][n - 1];
    for (let i = n - 2; i >= 0; i--) {
        let tempSum: number = 0;
        for (let k = i + 1; k < n; k++) {
            tempSum += G[i][k] * X[k];
        }
        X[i] = (Y[i] - tempSum) / G[i][i];
    }
    return X;
}

interface Result {
    A: Array<Array<number>>,
    B: Array<number>
}

function createAandB() :Result {
    let answer :Result = {
        A: [],
        B: []
    };
    for (let i = 0; i < n; i++) {
        let line :Array<number> = [];
        for (let j = 0; j < n; j++) {
            line.push(scalar(phi(i), phi(j)));
        }
        answer.A.push(line);
    }
    for (let i = 0; i < n; i++) {
        answer.B.push(scalar(F, phi(i)))
    }
    return answer;
}

const matrix_A_B = createAandB();

const result :Array<number> = squareRootMethod(matrix_A_B.A, matrix_A_B.B);

console.log('hi');
console.log(JSON.stringify(result));
