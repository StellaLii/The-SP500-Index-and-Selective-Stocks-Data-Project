
import pandas as pd

def data_process():
    df1 = pd.read_csv('S&PSPX2012.csv')
    df2 = pd.read_csv('S&PSPX2013.csv')
    df3 = pd.read_csv('S&PSPX2014.csv')
    df4 = pd.read_csv('S&PSPX2015.csv')
    df5 = pd.read_csv('S&PSPX2016.csv')
    df6 = pd.read_csv('S&PSPX2017.csv')
    df7 = pd.read_csv('S&PSPX2018.csv')
    df8 = pd.read_csv('S&PSPX2019.csv')
    df9 = pd.read_csv('S&PSPX2020.csv')
    df10 = pd.read_csv('S&PSPX2021.csv')
    df11 = pd.read_csv('S&PSPX2022.csv')
    df_all_rows = pd.concat([df1, df2, df3, df4, df5, df6, df7, df8, df9, df10, df11])
    df_all_rows.drop_duplicates()
    df_all_rows.replace(',','', regex=True, inplace=True)
    df_all_rows['Open'] = df_all_rows.Open.astype(float)
    df_all_rows['High'] = df_all_rows.High.astype(float)
    df_all_rows['Low'] = df_all_rows.Low.astype(float)
    df_all_rows['Close'] = df_all_rows.Close.astype(float)
    # df_all_rows.to_csv('S&PSPX', encoding='utf-8', index=False)
    return df_all_rows

if __name__ == "__main__":
    dp = data_process()
    print(dp)
