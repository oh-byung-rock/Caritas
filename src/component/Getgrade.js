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
       { age: [0, 19], grade: { 
        elite: [1.76, Infinity], 
        advanced: [1.34, 1.75], 
        mid: [1.19, 1.33], 
        average: [1.06, 1.18], 
        beginner: [0.89, 1.05], 
        entry: [0, 0.88] 
      } 
    },

    // ▼ 30 ~ 39세
    { age: [0, 19], grade: { 
        elite: [1.76, Infinity], 
        advanced: [1.34, 1.75], 
        mid: [1.19, 1.33], 
        average: [1.06, 1.18], 
        beginner: [0.89, 1.05], 
        entry: [0, 0.88] 
      } 
    },

    // ▼ 40 ~ 49세
    { age: [0, 19], grade: { 
        elite: [1.76, Infinity], 
        advanced: [1.34, 1.75], 
        mid: [1.19, 1.33], 
        average: [1.06, 1.18], 
        beginner: [0.89, 1.05], 
        entry: [0, 0.88] 
      } 
    },

    // ▼ 50 ~ 59세
    { age: [0, 19], grade: { 
        elite: [1.76, Infinity], 
        advanced: [1.34, 1.75], 
        mid: [1.19, 1.33], 
        average: [1.06, 1.18], 
        beginner: [0.89, 1.05], 
        entry: [0, 0.88] 
      } 
    },

    // ▼ 60세 ~ 
    { age: [0, 19], grade: { 
        elite: [1.76, Infinity], 
        advanced: [1.34, 1.75], 
        mid: [1.19, 1.33], 
        average: [1.06, 1.18], 
        beginner: [0.89, 1.05], 
        entry: [0, 0.88] 
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
       { age: [0, 19], grade: { 
        elite: [1.76, Infinity], 
        advanced: [1.34, 1.75], 
        mid: [1.19, 1.33], 
        average: [1.06, 1.18], 
        beginner: [0.89, 1.05], 
        entry: [0, 0.88] 
      } 
    },

        // ▼ 30 ~ 39세
        { age: [0, 19], grade: { 
            elite: [1.76, Infinity], 
            advanced: [1.34, 1.75], 
            mid: [1.19, 1.33], 
            average: [1.06, 1.18], 
            beginner: [0.89, 1.05], 
            entry: [0, 0.88] 
        } 
        },

        // ▼ 40 ~ 49세
        { age: [0, 19], grade: { 
            elite: [1.76, Infinity], 
            advanced: [1.34, 1.75], 
            mid: [1.19, 1.33], 
            average: [1.06, 1.18], 
            beginner: [0.89, 1.05], 
            entry: [0, 0.88] 
        } 
        },

        // ▼ 50 ~ 59세
        { age: [0, 19], grade: { 
            elite: [1.76, Infinity], 
            advanced: [1.34, 1.75], 
            mid: [1.19, 1.33], 
            average: [1.06, 1.18], 
            beginner: [0.89, 1.05], 
            entry: [0, 0.88] 
        } 
        },

        // ▼ 60세 ~ 
        { age: [0, 19], grade: { 
            elite: [1.76, Infinity], 
            advanced: [1.34, 1.75], 
            mid: [1.19, 1.33], 
            average: [1.06, 1.18], 
            beginner: [0.89, 1.05], 
            entry: [0, 0.88] 
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
  
    return grade;
  }
  