import { cmd } from '../src'
import { Html, Reader, lazy } from '../src/React'
import * as React from 'react'

export type Model = {
  num: number
  str: string
  arr: Array<string>
  obj: { a: string }
}

export const init: [Model, cmd.Cmd<Msg>] = [
  {
    num: 1,
    str: 'a',
    arr: ['a', 'b'],
    obj: { a: 'a' }
  },
  cmd.none
]

export type Msg =
  | { type: 'LeaveSame' }
  | { type: 'ChangeNum' }
  | { type: 'ChangeStr' }
  | { type: 'ChangeArr' }
  | { type: 'ChangeObj' }

export function update(msg: Msg, model: Model): [Model, cmd.Cmd<Msg>] {
  switch (msg.type) {
    case 'LeaveSame':
      return [{ ...model }, cmd.none]
    case 'ChangeNum':
      return [{ ...model, num: model.num + 1 }, cmd.none]
    case 'ChangeStr':
      return [{ ...model, str: model.str + 'a' }, cmd.none]
    case 'ChangeArr':
      return [{ ...model, arr: [model.arr[1], model.arr[0]] }, cmd.none]
    case 'ChangeObj':
      return [{ ...model, obj: { a: model.obj.a + 'a' } }, cmd.none]
  }
}

function paramsView(num: number, str: string, arr: Array<string>, obj: { a: string }): Html<Msg> {
  return new Reader(dispatch => (
    <div>
      <p>Num</p>
      {num}
      <button onClick={() => dispatch({ type: 'ChangeNum' })}>Change Num</button>
      <p>Str</p>
      {str}
      <button onClick={() => dispatch({ type: 'ChangeStr' })}>Change Str</button>
      <p>Arr</p>
      {JSON.stringify(arr)}
      <button onClick={() => dispatch({ type: 'ChangeArr' })}>Change Arr</button>
      <p>Obj</p>
      {JSON.stringify(obj)}
      <button onClick={() => dispatch({ type: 'ChangeObj' })}>Change Obj</button>
      <div>
        <button onClick={() => dispatch({ type: 'LeaveSame' })}>Leave everything the same</button>
      </div>
    </div>
  ))
}

export function view(model: Model): Html<Msg> {
  return new Reader(dispatch => (
    <div>
      {lazy(paramsView)(model.num, model.str, model.arr, model.obj).run(dispatch)}
    </div>
  ))
}
