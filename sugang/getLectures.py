import xlrd
import pandas as pd

def getLecturesFromSemester(file, year, sem):
    temp = (xlrd.open_workbook(file)).sheet_by_index(0)
    if f'년도 : {year}학년도,   학기 : {sem}학기' not in temp.row_values(1)[0]:
        raise NameError(f'file 이름 "{file}"이 잘못되었습니다')
    del temp

    df = pd.read_excel(file, header = 2)[['교과목명', '주담당교수']]
    return df

year = 2019
sem = 1
df = getLecturesFromSemester(f'./{year}_{sem}.xls', year, sem)

for year in range(2018, 2012, -1):
    for sem in ['겨울', 2, '여름', 1]:
        df = df.append(getLecturesFromSemester(f'./{year}_{sem}.xls', year, sem))

df = df.drop_duplicates()
df.to_csv(path_or_buf = './lectures.csv')
