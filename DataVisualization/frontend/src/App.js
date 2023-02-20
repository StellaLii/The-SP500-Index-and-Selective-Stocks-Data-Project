import React, { useState } from 'react';
import ReactEcharts from "echarts-for-react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import './App.css'

function spx_candle(data) {
    const upColor = '#ec0000';
    const upBorderColor = '#8A0000';
    const downColor = '#00da3c';
    const downBorderColor = '#008F28';
    const option = {
        dataset: {
            source: data
        },
        title: {
            text: "S&P500 Index's historical data (2012-2022)"
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'line'
            }
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        grid: [
            {
                left: '10%',
                right: '10%',
                bottom: 200
            },
            {
                left: '10%',
                right: '10%',
                height: 80,
                bottom: 80
            }
        ],
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                // inverse: true,
                axisLine: { onZero: false },
                splitLine: { show: false },
                min: 'dataMin',
                max: 'dataMax'
            },
            {
                type: 'category',
                gridIndex: 1,
                boundaryGap: false,
                axisLine: { onZero: false },
                axisTick: { show: false },
                splitLine: { show: false },
                axisLabel: { show: false },
                min: 'dataMin',
                max: 'dataMax'
            }
        ],
        yAxis: [
            {
                scale: true,
                splitArea: {
                    show: true
                }
            },
            {
                scale: true,
                gridIndex: 1,
                splitNumber: 2,
                axisLabel: { show: false },
                axisLine: { show: false },
                axisTick: { show: false },
                splitLine: { show: false }
            }
        ],
        dataZoom: [
            {
                type: 'inside',
                xAxisIndex: [0, 1],
                start: 10,
                end: 100
            },
            {
                show: true,
                xAxisIndex: [0, 1],
                type: 'slider',
                bottom: 10,
                start: 10,
                end: 100
            }
        ],
        visualMap: {
            show: false,
            seriesIndex: 1,
            dimension: 6,
            pieces: [
                {
                    value: 1,
                    color: upColor
                },
                {
                    value: -1,
                    color: downColor
                }
            ]
        },
        series: [
            {
                type: 'candlestick',
                itemStyle: {
                    color: upColor,
                    color0: downColor,
                    borderColor: upBorderColor,
                    borderColor0: downBorderColor
                },
                encode: {
                    x: 0,
                    y: [1, 4, 3, 2]
                }
            }
        ]
    };
    return option;
}

function company_sector(data) {
    const colors = ['#5470C6', '#91CC75', '#EE6666'];
    const option = {
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: { left: '13%', right: '10%' },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        legend: {
            data: ['# of Companies', 'Total Market Cap', 'Revenue Growth']
        },
        yAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: data['cat']
            }
        ],
        xAxis: [
            {
                type: 'value',
                name: '# of Companies',
                position: 'bottom',
                alignTicks: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: 'Total Market Cap',
                position: 'bottom',
                alignTicks: true,
                offset: 40,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: colors[1]
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: 'Revenue Growth',
                position: 'top',
                offset: -0,
                alignTicks: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: colors[2]
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name: '# of Companies',
                type: 'bar',
                data: data["comp"]
            },
            {
                name: 'Total Market Cap',
                type: 'bar',
                xAxisIndex: 1,
                data: data["cap"]
            },
            {
                name: 'Revenue Growth',
                type: 'bar',
                xAxisIndex: 2,
                data: data['growth']
            }
        ]
    };

    return option;
}

function top_ten(data) {
    const colors = ['#5470C6', '#91CC75', '#EE6666', '#AAAA75'];
    const option = {
        color: colors,
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: {
            right: '10%',
            left: '17%'
        },
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: false },
                restore: { show: true },
                saveAsImage: { show: true }
            }
        },
        legend: {
            data: ['Market Cap', 'EBITDA', 'Current Price', 'Fulltime Employees']
        },
        yAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: data['cat']
            }
        ],
        xAxis: [
            {
                type: 'value',
                name: 'Market Cap',
                position: 'bottom',
                alignTicks: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: 'EBITDA',
                position: 'bottom',
                alignTicks: true,
                offset: 30,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: colors[1]
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: 'Current Price',
                position: 'top',
                alignTicks: true,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: colors[2]
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            {
                type: 'value',
                name: 'Fulltime Employees',
                position: 'top',
                alignTicks: true,
                offset: 20,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: colors[3]
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name: 'Market Cap',
                type: 'bar',
                data: data["cap"]
            },
            {
                name: 'EBITDA',
                type: 'bar',
                xAxisIndex: 1,
                data: data["ebi"]
            },
            {
                name: 'Current Price',
                type: 'bar',
                xAxisIndex: 2,
                data: data['price']
            },
            {
                name: 'Fulltime Employees',
                type: 'bar',
                xAxisIndex: 3,
                data: data['emp']
            }
        ]
    };

    return option;
}

function five_comp(data) {
    const option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        legend: {
            data: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA'],
            orient: 'vertical',
            left: '1000px',
            top: '50px'
        },
        title: {
            left: 'center',
            text: 'Selected 5 Companies Close Price Comparison'
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data['date']
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100
            },
            {
                start: 0,
                end: 100
            }
        ],
        series: [
            {
                name: 'AAPL',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(0, 70, 131)'
                },
                data: data["aapl"]
            },
            {
                name: 'MSFT',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(255, 70, 131)'
                },
                data: data["msft"]
            },
            {
                name: 'GOOGL',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(0, 255, 131)'
                },
                data: data["googl"]
            },
            {
                name: 'AMZN',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(131, 70, 131)'
                },
                data: data["amzn"]
            },
            {
                name: 'NVDA',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(170, 60, 0)'
                },
                data: data["nvda"]
            }
        ]
    };
    return option;
}

function comp_volume(data) {
    const option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        legend: {
            data: ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'NVDA'],
            orient: 'vertical',
            left: '1000px',
            top: '50px'
        },
        title: {
            left: 'center',
            text: 'Selected 5 Companies Volume Comparison'
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: data['date']
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100
            },
            {
                start: 0,
                end: 100
            }
        ],
        series: [
            {
                name: 'AAPL',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(0, 70, 131)'
                },
                data: data["aapl"]
            },
            {
                name: 'MSFT',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(255, 70, 131)'
                },
                data: data["msft"]
            },
            {
                name: 'GOOGL',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(0, 255, 131)'
                },
                data: data["googl"]
            },
            {
                name: 'AMZN',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(131, 70, 131)'
                },
                data: data["amzn"]
            },
            {
                name: 'NVDA',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(170, 60, 0)'
                },
                data: data["nvda"]
            }
        ]
    };
    return option;
}

function cpp(data) {
    const option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        legend: {
            data: [data["name"] + '-Train', data["name"] + '-Prediction', data["name"] + '-Validation'],
            orient: 'vertical',
            left: '1000px',
            top: '50px'
        },
        title: {
            left: 'center',
            text: 'Close Price Prediction: ' + data["name"]
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100
            },
            {
                start: 0,
                end: 100
            }
        ],
        series: [
            {
                connectNulls: false,
                name: data["name"] + '-Train',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(0, 70, 131)'
                },
                data: data["t"]
            },
            {
                connectNulls: false,
                name: data["name"] + '-Validation',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(255, 70, 131)'
                },
                data: data["v"]
            },
            {
                connectNulls: false,
                name: data["name"] + '-Prediction',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(0, 255, 131)'
                },
                data: data["p"]
            }
        ]
    };
    return option;
}

function sma(data) {
    const option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        legend: {
            data: ['SMA-Year', 'SMA-Month', 'Close Price'],
            orient: 'vertical',
            left: '1000px',
            top: '50px'
        },
        // title: {
        //   left: 'center',
        //   text: 'Close Price Prediction: '+data["name"]
        // },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            source: data['date']
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100
            },
            {
                start: 0,
                end: 100
            }
        ],
        series: [
            {
                connectNulls: false,
                name: 'SMA-Year',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(0, 70, 131)'
                },
                data: data["sy"]
            },
            {
                connectNulls: false,
                name: 'SMA-Month',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(255, 70, 131)'
                },
                data: data["sm"]
            },
            {
                connectNulls: false,
                name: 'Close Price',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(0, 255, 131)'
                },
                data: data["close"]
            }
        ]
    };
    return option;
}

function ema(data) {
    const option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        legend: {
            data: ['EMA-Year', 'EMA-Month', 'Close Price'],
            orient: 'vertical',
            left: '1000px',
            top: '50px'
        },
        // title: {
        //   left: 'center',
        //   text: 'Close Price Prediction: '+data["name"]
        // },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            source: data['date']
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100
            },
            {
                start: 0,
                end: 100
            }
        ],
        series: [
            {
                connectNulls: false,
                name: 'EMA-Year',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(0, 70, 131)'
                },
                data: data["ey"]
            },
            {
                connectNulls: false,
                name: 'EMA-Month',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(255, 70, 131)'
                },
                data: data["em"]
            },
            {
                connectNulls: false,
                name: 'Close Price',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(0, 255, 131)'
                },
                data: data["close"]
            }
        ]
    };
    return option;
}

function sema(data) {
    const option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        legend: {
            data: ['SMA-Month', 'EMA-Month', 'Close Price'],
            orient: 'vertical',
            left: '1000px',
            top: '50px'
        },
        // title: {
        //   left: 'center',
        //   text: 'Close Price Prediction: '+data["name"]
        // },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            source: data['date']
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100
            },
            {
                start: 0,
                end: 100
            }
        ],
        series: [
            {
                connectNulls: false,
                name: 'SMA-Month',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(0, 70, 131)'
                },
                data: data["sm"]
            },
            {
                connectNulls: false,
                name: 'EMA-Month',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(255, 70, 131)'
                },
                data: data["em"]
            },
            {
                connectNulls: false,
                name: 'Close Price',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(0, 255, 131)'
                },
                data: data["close"]
            }
        ]
    };
    return option;
}

function rsi(data) {
    const option = {
        xAxis: {
            type: 'category',
            data: data['id']
        },
        yAxis: {
            type: 'value',
            min: 0,
            max: 100
        },
        series: [
            {
                data: data['rsi'],
                type: 'line',
                smooth: true,
                markLine: {
                    symbol: ['none', 'none'],
                    itemStyle: {
                        normal: {
                            lineStyle: { type: 'solid', color: 'black' },
                            label: { show: true, position: 'start' }
                        }
                    },
                    data: [{
                        yAxis: 70,
                        label: '70'
                    },
                    {
                        yAxis: 30,
                        label: '30'
                    }
                    ]
                }
            }
        ]
    };
    return option;
}

function macd(data) {
    const option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        legend: {
            data: ['MACD', 'MACD-Signal'],
            orient: 'vertical',
            left: '1000px',
            top: '50px'
        },
        // title: {
        //   left: 'center',
        //   text: 'Close Price Prediction: '+data["name"]
        // },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            source: data['date']
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100
            },
            {
                start: 0,
                end: 100
            }
        ],
        series: [
            {
                connectNulls: false,
                name: 'MACD',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(0, 70, 131)'
                },
                data: data["macd"]
            },
            {
                connectNulls: false,
                name: 'MACD-Signal',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(255, 70, 131)'
                },
                data: data["sig"]
            }
        ]
    };
    return option;
}

function spx_fc(data) {
    const option = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%'];
            }
        },
        legend: {
            data: ['Index-Train', 'Index-Prediction', 'Index-Validation'],
            orient: 'vertical',
            left: '1000px',
            top: '50px'
        },
        title: {
            left: 'center',
            text: 'S&P 500 Index Forecast '
        },
        toolbox: {
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '100%']
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100
            },
            {
                start: 0,
                end: 100
            }
        ],
        series: [
            {
                connectNulls: false,
                name: 'Index-Train',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(0, 70, 131)'
                },
                data: data["t"]
            },
            {
                connectNulls: false,
                name: 'Index-Validation',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(255, 70, 131)'
                },
                data: data["v"]
            },
            {
                connectNulls: false,
                name: 'Index-Prediction',
                type: 'line',
                symbol: 'none',
                sampling: 'lttb',
                itemStyle: {
                    color: 'rgb(0, 255, 131)'
                },
                data: data["p"]
            }
        ]
    };
    return option;
}

function ts(data) {
    const option = {
        grid: [
            { left: '0%', right: '75%', top: '0%', height: '33%' },
            { left: '0%', right: '75%', top: '33%', height: '33%' },
            { left: '0%', right: '75%', top: '66%', height: '33%' },
            { left: '25%', right: '50%', top: '0%', height: '33%' },
            { left: '25%', right: '50%', top: '33%', height: '33%' },
            { left: '25%', right: '50%', top: '66%', height: '33%' },
            { left: '50%', right: '25%', top: '0%', height: '33%' },
            { left: '50%', right: '25%', top: '33%', height: '33%' },
            { left: '50%', right: '25%', top: '66%', height: '33%' },
            { left: '75%', right: '0%', top: '0%', height: '33%' },
            { left: '75%', right: '0%', top: '33%', height: '33%' },
            { left: '75%', right: '0%', top: '66%', height: '33%' },
        ],
        axisPointer: {
            link: { xAxisIndex: 'all' }
        },
        legend: [
            {data: ['Seasonal', 'Trend', 'Resid', 'Close Price']},
            {data: ['Seasonal', 'Trend', 'Resid', 'Close Price']},
            {data: ['Seasonal', 'Trend', 'Resid', 'Close Price']},
            {data: ['Seasonal', 'Trend', 'Resid', 'Close Price']},
            {data: ['Seasonal', 'Trend', 'Resid', 'Close Price']},
            {data: ['Seasonal', 'Trend', 'Resid', 'Close Price']},
            {data: ['Seasonal', 'Trend', 'Resid', 'Close Price']},
            {data: ['Seasonal', 'Trend', 'Resid', 'Close Price']},
            {data: ['Seasonal', 'Trend', 'Resid', 'Close Price']},
            {data: ['Seasonal', 'Trend', 'Resid', 'Close Price']},
            {data: ['Seasonal', 'Trend', 'Resid', 'Close Price']},
            {data: ['Seasonal', 'Trend', 'Resid', 'Close Price']}
        ],
        xAxis: [
            {
                gridIndex: 0,
                boundaryGap: false,
                type: 'category',
                data: data['date']
            },
            {
                gridIndex: 1,
                boundaryGap: false,
                type: 'category',
                data: data['date']
            },
            {
                gridIndex: 2,
                boundaryGap: false,
                type: 'category',
                data: data['date']
            },
            {
                gridIndex: 3,
                boundaryGap: false,
                type: 'category',
                data: data['date']
            },
            {
                gridIndex: 4,
                boundaryGap: false,
                type: 'category',
                data: data['date']
            },
            {
                gridIndex: 5,
                boundaryGap: false,
                type: 'category',
                data: data['date']
            },
            {
                gridIndex: 6,
                boundaryGap: false,
                type: 'category',
                data: data['date']
            },
            {
                gridIndex: 7,
                boundaryGap: false,
                type: 'category',
                data: data['date']
            },
            {
                gridIndex: 8,
                boundaryGap: false,
                type: 'category',
                data: data['date']
            },
            {
                gridIndex: 9,
                boundaryGap: false,
                type: 'category',
                data: data['date']
            },
            {
                gridIndex: 10,
                boundaryGap: false,
                type: 'category',
                data: data['date']
            },
            {
                gridIndex: 11,
                boundaryGap: false,
                type: 'category',
                data: data['date']
            }
        ],
        yAxis: [{ gridIndex: 0, type: 'value' },
        { gridIndex: 1, type: 'value' },
        { gridIndex: 2, type: 'value' },
        { gridIndex: 3, type: 'value' },
        { gridIndex: 4, type: 'value' },
        { gridIndex: 5, type: 'value' },
        { gridIndex: 6, type: 'value' },
        { gridIndex: 7, type: 'value' },
        { gridIndex: 8, type: 'value' },
        { gridIndex: 9, type: 'value' },
        { gridIndex: 10, type: 'value' },
        { gridIndex: 11, type: 'value' }],
        series: [
            {
                xAxisIndex: 0,
                yAxisIndex: 0,
                name: 'Close Price',
                type: 'line',
                data: data['close1']
            },
            {
                xAxisIndex: 3,
                yAxisIndex: 3,
                name: 'Seasonal',
                type: 'line',
                data: data['seasonal1']
            },
            {
                xAxisIndex: 6,
                yAxisIndex: 6,
                name: 'Trend',
                type: 'line',
                data: data['trend1']
            },
            {
                xAxisIndex: 9,
                yAxisIndex: 9,
                name: 'Resid',
                type: 'line',
                data: data['resid1']
            },{
                xAxisIndex: 1,
                yAxisIndex: 1,
                name: 'Close Price',
                type: 'line',
                data: data['close2']
            },
            {
                xAxisIndex: 4,
                yAxisIndex: 4,
                name: 'Seasonal',
                type: 'line',
                data: data['seasonal2']
            },
            {
                xAxisIndex: 7,
                yAxisIndex: 7,
                name: 'Trend',
                type: 'line',
                data: data['trend2']
            },
            {
                xAxisIndex: 10,
                yAxisIndex: 10,
                name: 'Resid',
                type: 'line',
                data: data['resid2']
            },{
                xAxisIndex: 2,
                yAxisIndex: 2,
                name: 'Close Price',
                type: 'line',
                data: data['close3']
            },
            {
                xAxisIndex: 5,
                yAxisIndex: 5,
                name: 'Seasonal',
                type: 'line',
                data: data['seasonal3']
            },
            {
                xAxisIndex: 8,
                yAxisIndex: 8,
                name: 'Trend',
                type: 'line',
                data: data['trend3']
            },
            {
                xAxisIndex: 11,
                yAxisIndex: 11,
                name: 'Resid',
                type: 'line',
                data: data['resid3']
            }
        ]
    };
    return option;
}

function App() {
    const [loaded, setLoaded] = useState(false);
    const [data, setData] = useState([]);
    const [graph, setGraph] = useState("candle");

    const option_generator = {
        "company_sector": company_sector,
        "top10": top_ten,
        "five_comp": five_comp,
        "comp_volume": comp_volume,
        "cpp_aapl": cpp,
        "cpp_msft": cpp,
        "cpp_googl": cpp,
        "cpp_amzn": cpp,
        "cpp_nvda": cpp,
        "candle": spx_candle,
        "sma": sma,
        "ema": ema,
        "sema": sema,
        "rsi": rsi,
        "macd": macd,
        "spx_fc": spx_fc,
        "ts": ts
    };

    const text = {
        "company_sector": {
            pre: "",
            post: ""
        },
        "top10": {
            pre: "",
            post: ""
        },
        "five_comp": {
            pre: "",
            post: `Those stocks are from Top 10 stocks of company analysis.
            From the chart, we can see that the trends of these 5 stocks are basically very similar with each other and S&P 500 index.
            `
        },
        "comp_volume": {
            pre: "",
            post: ""
        },
        "cpp_aapl": {
            pre: "",
            post: ""
        },
        "cpp_msft": {
            pre: "",
            post: ""
        },
        "cpp_googl": {
            pre: "",
            post: ""
        },
        "cpp_amzn": {
            pre: "",
            post: ""
        },
        "cpp_nvda": {
            pre: "",
            post: ""
        },
        "candle": {
            pre: `The S&P 500 is one of the most important financial barometers to indicate the overall status of the macro economy.
            The S&P 500 is an equity index made up of 500 of the largest companies traded on either the NYSE, Nasdaq, or Cboe. it is calculated by adding each company's float-adjusted market capitalization.
            From the historical line chart of S&P 500 Index, we can discover steady economic growth in the last decade, with a downward trend after 2021.
            `,
            post: `A candlestick chart (also called K-line) is a style of financial chart used to describe price movements of a security, derivative, or currency.
            `
        },
        "sma": {
            pre: "",
            post: `SMA calculates the average of prices over a given interval of time and is used to determine the trend of the stock.
            As defined above, I will create a slow SMA (SMA_Year) and a fast SMA (SMA_Month).
            Although SMA is quite common, it contains a bias of giving equal weight to each value in the past.
            `
        },
        "ema": {
            pre: "",
            post: `An exponential moving average (EMA) is a type of moving average (MA) that places a greater weight and significance on the most recent data points.
            Basically what it means is that the newer stock price data has a higher weightage/significance on the price than older days.
            `
        },
        "sema": {
            pre: "",
            post: ""
        },
        "rsi": {
            pre: "",
            post: `A momentum indicator used in technical analysis that measures the magnitude of recent price changes to evaluate overbought or oversold conditions in the price of a stock.
            If the RSI value is >70 then the stock is overbought and if <30 then its oversold.
            From the chart, we can see that overbought or oversold conditions are frequent in the recent 10 years.
            `
        },
        "macd": {
            pre: "",
            post: `MACD uses two exponentially moving averages and creates a trend analysis based on their convergence or divergence. 
            The most commonly used MACD slow and fast signals are based on 30 days and 365 days respectively. 
            The MACD is calculated by subtracting the 30-period exponential moving average (EMA) from the 365-period EMA. 
            Similar to RSI, MACD triggers technical signals when it crosses above (to buy) or below (to sell) its signal line. 
            `
        },
        "spx_fc": {
            pre: "Use LSTM model to make prediction:",
            post: ""
        },
        "ts": {
            pre: `We can decompose a time series into trend, seasonal amd remainder components, as mentioned in the earlier section. 
            The series can be decomposed as an additive or multiplicative combination of the base level, trend, seasonal index and the residual. 
            The seasonal_decompose in statsmodels is used to implements the decomposition. 
            `,
            post: `There is clearly an upward trend in the above plot.
            You can also see the uniform seasonal change. 
            Non-uniform noise that represents outliers and missing values.`
        }
    }

    if (!loaded) {
        fetch(`http://localhost:12345/${graph}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setLoaded(true);
                    setData(result.data);
                },
                (error) => {
                }
            )
    }

    if (!loaded) {
        return (<>
            <div class='nav-container'>
                <Navbar className="navBar" bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">Stock Data Analysis</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav fill onSelect={(selectedKey) => {
                                setGraph(selectedKey);
                                setLoaded(false);
                            }}>
                                <Nav.Item>
                                    <NavDropdown title="S&P 500 Index Analysis" id="nav-dropdown">
                                        <NavDropdown.Item eventKey="candle">S&P500 Index's historical data (2012-2022)</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="sma">Simple Moving Average</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="ema">Exponential Moving Average</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="sema">SMA/EMA Comparison</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="rsi">Relative Strength Index</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="macd">Moving Average Convergence Divergence</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="ts">Time Series Decomposition</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="spx_fc">S&P 500 Index Forecast</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavDropdown title="Analysis by Company" id="nav-dropdown">
                                        <NavDropdown.Item eventKey="company_sector">The leading sector in S&P 500</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="top10">Top 10 Stock's Market Cap, EBIDTA & Full Time Employees Comparison</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavDropdown title="Stock Analysis" id="nav-dropdown">
                                        <NavDropdown.Item eventKey="five_comp">Selected 5 Companies Close Price Comparison</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="comp_volume">Selected 5 Companies Volume Comparison</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavDropdown title="Stock Prediction" id="nav-dropdown">
                                        <NavDropdown.Item eventKey="cpp_aapl">Close Price Prediction: AAPL</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="cpp_msft">Close Price Prediction: MSFT</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="cpp_googl">Close Price Prediction: GOOGL</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="cpp_amzn">Close Price Prediction: AMZN</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="cpp_nvda">Close Price Prediction: NVDA</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <div class='chart-container'>Loading...</div>
        </>);
    } else {
        return (<>
            <div class='nav-container'>
                <Navbar className="navBar" bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">Stock Data Analysis</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav fill onSelect={(selectedKey) => {
                                setGraph(selectedKey);
                                setLoaded(false);
                            }}>
                                <Nav.Item>
                                    <NavDropdown title="S&P 500 Index Analysis" id="nav-dropdown">
                                        <NavDropdown.Item eventKey="candle">S&P500 Index's historical data (2012-2022)</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="sma">Simple Moving Average</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="ema">Exponential Moving Average</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="sema">SMA/EMA Comparison</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="rsi">Relative Strength Index</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="macd">Moving Average Convergence Divergence</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="ts">Time Series Decomposition</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="spx_fc">S&P 500 Index Forecast</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavDropdown title="Analysis by Company" id="nav-dropdown">
                                        <NavDropdown.Item eventKey="company_sector">The leading sector in S&P 500</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="top10">Top 10 Stock's Market Cap, EBIDTA & Full Time Employees Comparison</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavDropdown title="Stock Analysis" id="nav-dropdown">
                                        <NavDropdown.Item eventKey="five_comp">Selected 5 Companies Close Price Comparison</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="comp_volume">Selected 5 Companies Volume Comparison</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav.Item>
                                <Nav.Item>
                                    <NavDropdown title="Stock Prediction" id="nav-dropdown">
                                        <NavDropdown.Item eventKey="cpp_aapl">Close Price Prediction: AAPL</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="cpp_msft">Close Price Prediction: MSFT</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="cpp_googl">Close Price Prediction: GOOGL</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="cpp_amzn">Close Price Prediction: AMZN</NavDropdown.Item>
                                        <NavDropdown.Item eventKey="cpp_nvda">Close Price Prediction: NVDA</NavDropdown.Item>
                                    </NavDropdown>
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <div class="desc">
                {text[graph].pre}
            </div>
            <div class="chart-container">
                <ReactEcharts
                    option={option_generator[graph](data)}
                    lazyUpdate={false}
                    showLoading={false}
                    style={{ width: '90vw', height: '80vmin', fontSize: '4vmin' }}
                ></ReactEcharts>
            </div>
            <div class="desc">
                {text[graph].post}
            </div>
        </>
        );
    }
}

export default App;