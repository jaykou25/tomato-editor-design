/* 获取一个元素相对于另一个元素的内部的(client)距离(包含滚动)
 *
 * A是父元素, B是子元素
 * top是指B的上边缘距A的内部的(含滚动的)上边缘的距离. (A的内部指的是减掉clientTop或clientLeft后的内容,
 * 为什么要内部是因为子元素的定位就是从这个内容上进行定位的)
 */

export function getRelPosition(rect, relativeEle) {
  /*
  如果没有滚动, 那么相对距离只要他们两个元素各自的绝对距离相减, 再减去clientTop或ClientLeft.
  如果有滚动, 那么还需要加上已滚动的距离
  */
  const box = rect
  const boxRel = relativeEle.getBoundingClientRect()

  const left =
    box.x - boxRel.x - relativeEle.clientLeft + (relativeEle.scrollLeft || 0)
  const top =
    box.y - boxRel.y - relativeEle.clientTop + (relativeEle.scrollTop || 0)

  return {
    left,
    top,
  }
}
