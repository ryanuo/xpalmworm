/*
 * @Author: Harry
 * @Date: 2022-05-12 22:19:38
 * @LastEditors: harry
 * @Github: https://github.com/rr210
 * @LastEditTime: 2022-05-14 13:42:55
 * @FilePath: \xpalmworm\src\utils\samll\options.ts
 */
const Options: {} = {
  title: { text: '历史识别分析' },
  grid: { containLabel: true },
  xAxis: { name: 'amount' },
  yAxis: { type: 'category' },
  visualMap: {
    orient: 'horizontal',
    left: 'center',
    min: 10,
    max: 100,
    text: ['High Score', 'Low Score'],
    // Map the score column to color
    dimension: 0,
    inRange: {
      color: ['#65B581', '#FFCE34', '#FD665F']
    }
  },
  series: [
    {
      type: 'bar',
      encode: {
        // Map the "amount" column to X axis.
        x: 'amount',
        // Map the "product" column to Y axis
        y: 'product'
      },
      label: {
        show: true
      }
    }
  ]
}
export { Options }