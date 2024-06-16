// import { Document, Model } from "mongoose";


// interface MonthData{
//     month:string,
//     count:number
// }

// export async function generaLast12MonthData<T extends Document>(model:Model <T>):Promise<{last12Months:MonthData[]}>{
//     const last12Months: MonthData[]=[]
//     const currentDate = new Date()
//     currentDate.setDate(currentDate.getDate() + 1);

//     for(let i=11; i>=0;i--){
//         const endDate = new Date(
//           currentDate.getFullYear(),
//           currentDate.getMonth(),
//           currentDate.getDate() - i * 28
//         );
//         const startDate = new Date(
//           endDate.getFullYear(),
//           endDate.getMonth(),
//           endDate.getDate() - 28
//         );
//         const monthYear = endDate.toLocaleString("default", {
//           day: "numeric",
//           month: "short",
//           year: "numeric",
//         });
//         const count = await model.countDocuments({
//           createdAt: {
//             $gte: startDate,
//             $lt: endDate,
//           },
//         });
//         last12Months.push({ month: monthYear, count });
//     }
//     return { last12Months };
// }
import { Document, Model } from "mongoose";

interface MonthData {
    month: string;
    count: number;
}

interface Last12MonthData {
    last12Months: MonthData[];
    currentDate: string;
}

export async function generaLast12MonthData<T extends Document>(model: Model<T>): Promise<Last12MonthData> {
    const last12Months: MonthData[] = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);

    for (let i = 11; i >= 0; i--) {
        const endDate = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            currentDate.getDate() - i * 28
        );
        const startDate = new Date(
            endDate.getFullYear(),
            endDate.getMonth(),
            endDate.getDate() - 28
        );
        const monthYear = endDate.toLocaleString("default", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
        const count = await model.countDocuments({
            createdAt: {
                $gte: startDate,
                $lt: endDate,
            },
        });
        last12Months.push({ month: monthYear, count });
    }

    // Capture the current date and time as a string
    const currentDateString = new Date().toLocaleString("default", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });

    return { last12Months, currentDate: currentDateString };
}
