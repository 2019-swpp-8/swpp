import xlrd
import pandas as pd

dirName = './'

def getLecturesFromSemester(file, year, sem):
    temp = (xlrd.open_workbook(file)).sheet_by_index(0)
    if f'년도 : {year}학년도,   학기 : {sem}학기' not in temp.row_values(1)[0]:
        raise NameError('file 이름이 잘못되었습니다')
    del temp

    df = pd.read_excel(file, header = 2)[['교과목명', '주담당교수']]
    return df

year = 2017
sem = 1
print(getLecturesFromSemester(dirName + f'{year}_{sem}.xls', year, sem).head())
