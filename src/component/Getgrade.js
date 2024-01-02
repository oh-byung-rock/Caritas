const weightData = {
    male: [
    // ▼ 0 ~ 19세
      { age: [0, 19], grade: { 
          elite: [1.76, Infinity], 
          advanced: [1.34, 1.75], 
          mid: [1.19, 1.33], 
          average: [1.06, 1.18], 
          beginner: [0.89, 1.05], 
          entry: [0, 0.88] 
        } 
      },

    // ▼ 20 ~ 29세
       { age: [20, 29], grade: { 
        elite: [1.63, Infinity], 
        advanced: [1.32, 1.62], 
        mid: [1.14, 1.31], 
        average: [0.99, 1.13], 
        beginner: [0.88, 0.98], 
        entry: [0, 0.87] 
      } 
    },

    // ▼ 30 ~ 39세
    { age: [30, 39], grade: { 
        elite: [1.35, Infinity], 
        advanced: [1.12, 1.34], 
        mid: [0.98, 1.11], 
        average: [0.88, 0.97], 
        beginner: [0.78, 0.87], 
        entry: [0, 0.77] 
      } 
    },

    // ▼ 40 ~ 49세
    { age: [40, 49], grade: { 
        elite: [1.2, Infinity], 
        advanced: [1, 1.19], 
        mid: [0.88, 0.99], 
        average: [0.8, 0.87], 
        beginner: [0.72, 0.79], 
        entry: [0, 0.71] 
      } 
    },

    // ▼ 50 ~ 59세
    { age: [50, 59], grade: { 
        elite: [1.05, Infinity], 
        advanced: [0.9, 1.04], 
        mid: [0.79, 0.89], 
        average: [0.71, 0.78], 
        beginner: [0.63, 0.7], 
        entry: [0, 0.62] 
      } 
    },

    // ▼ 60세 ~ 
    { age: [60, Infinity], grade: { 
        elite: [0.94, Infinity], 
        advanced: [0.82, 0.93], 
        mid: [0.72, 0.81], 
        average: [0.66, 0.71], 
        beginner: [0.57, 0.65], 
        entry: [0, 0.56] 
      } 
    },
    ],

    female: [
        // ▼ ~ 19세
      { age: [0, 19], grade: { 
          elite: [0.88, Infinity], 
          advanced: [0.77, 0.87], 
          mid: [0.65, 0.76], 
          average: [0.58, 0.64], 
          beginner: [0.53, 0.57], 
          entry: [0, 0.52] 
        } 
      },
        // ▼ 20 ~ 29세
       { age: [20, 29], grade: { 
        elite: [1.01, Infinity], 
        advanced: [0.8, 1], 
        mid: [0.7, 0.79], 
        average: [0.59, 0.69], 
        beginner: [0.51, 0.58], 
        entry: [0, 0.5] 
      } 
    },

        // ▼ 30 ~ 39세
        { age: [30, 39], grade: { 
            elite: [0.82, Infinity], 
            advanced: [0.7, 0.81], 
            mid: [0.6, 0.69], 
            average: [0.53, 0.59], 
            beginner: [0.47, 0.52], 
            entry: [0, 0.46] 
        } 
        },

        // ▼ 40 ~ 49세
        { age: [40, 49], grade: { 
            elite: [0.77, Infinity], 
            advanced: [0.62, 0.76], 
            mid: [0.54, 0.61], 
            average: [0.5, 0.53], 
            beginner: [0.43, 0.49], 
            entry: [0, 0.42] 
        } 
        },

        // ▼ 50 ~ 59세
        { age: [50, 59], grade: { 
            elite: [0.68, Infinity], 
            advanced: [0.55, 0.67], 
            mid: [0.48, 0.54], 
            average: [0.44, 0.47], 
            beginner: [0.39, 0.43], 
            entry: [0, 0.38] 
        } 
        },

        // ▼ 60세 ~ 
        { age: [60, Infinity], grade: { 
            elite: [0.72, Infinity], 
            advanced: [0.54, 0.71], 
            mid: [0.47, 0.53], 
            average: [0.43, 0.46], 
            beginner: [0.38, 0.42], 
            entry: [0, 0.37] 
        } 
        },
    ],
  };
  
  export function getGrade(gender, age, bodyWeight, directWeight, indirectWeight) {
    const weight = directWeight || indirectWeight;
    const ratio = Number((weight / bodyWeight).toFixed(2)); // 소수셋째자리 반올림
  
    const targetData = weightData[gender].find(data => data.age[0] <= age && age <= data.age[1]);
    
    let grade = '';
    if (ratio >= targetData.grade.elite[0] && ratio < targetData.grade.elite[1]) grade = '엘리트';
    else if (ratio >= targetData.grade.advanced[0] && ratio < targetData.grade.advanced[1]) grade = '고급';
    else if (ratio >= targetData.grade.mid[0] && ratio < targetData.grade.mid[1]) grade = '중급';
    else if (ratio >= targetData.grade.average[0] && ratio < targetData.grade.average[1]) grade = '평균';
    else if (ratio >= targetData.grade.beginner[0] && ratio < targetData.grade.beginner[1]) grade = '초급';
    else grade = '입문';
    console.log('결과', grade)
    return grade;
  }
  