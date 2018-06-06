import { cmd } from '../src'
import * as Html from '../src/React'
import * as React from 'react'
import * as Counter from './Counter'
import * as Http from './Http'
import * as LabeledCheckboxes from './LabeledCheckboxes'
import * as Task from './Task'
import * as LazyTest from './LazyTest'

export type Model = {
  counter: Counter.Model
  http: Http.Model
  labeledCheckboxes: LabeledCheckboxes.Model
  task: Task.Model
  lazyTest: LazyTest.Model
}

export type Msg =
  | { type: 'Counter'; subMsg: Counter.Msg }
  | { type: 'Http'; subMsg: Http.Msg }
  | { type: 'LabeledCheckboxes'; subMsg: LabeledCheckboxes.Msg }
  | { type: 'Task'; subMsg: Task.Msg }
  | { type: 'LazyTest'; subMsg: LazyTest.Msg }

export type Flags = {
  http: Http.Flags
  labeledCheckboxes: LabeledCheckboxes.Flags
  task: Task.Flags
}

export const flags: Flags = {
  http: Http.flags,
  labeledCheckboxes: LabeledCheckboxes.flags,
  task: Task.flags
}

export function init(flags: Flags): [Model, cmd.Cmd<Msg>] {
  const [counter, counterCmd] = Counter.init
  const [http, httpCmd] = Http.init(flags.http)
  const [labeledCheckboxes, labeledCheckboxesCmd] = LabeledCheckboxes.init(flags.labeledCheckboxes)
  const [task, taskCmd] = Task.init(flags.task)
  const [lazyTest, lazyTestCmd] = LazyTest.init

  return [
    {
      counter,
      http,
      labeledCheckboxes,
      task,
      lazyTest
    },
    cmd.batch([
      cmd.map(subMsg => ({ type: 'Counter', subMsg } as Msg), counterCmd),
      cmd.map(subMsg => ({ type: 'Http', subMsg } as Msg), httpCmd),
      cmd.map(subMsg => ({ type: 'LabeledCheckboxes', subMsg } as Msg), labeledCheckboxesCmd),
      cmd.map(subMsg => ({ type: 'Task', subMsg } as Msg), taskCmd),
      cmd.map(subMsg => ({ type: 'LazyTest', subMsg } as Msg), lazyTestCmd)
    ])
  ]
}

export function update(msg: Msg, model: Model): [Model, cmd.Cmd<Msg>] {
  switch (msg.type) {
    case 'Counter':
      const [counter, counterCmd] = Counter.update(msg.subMsg, model.counter)
      return [{ ...model, counter }, cmd.map(subMsg => ({ type: 'Counter', subMsg } as Msg), counterCmd)]
    case 'Http':
      const [http, httpCmd] = Http.update(msg.subMsg, model.http)
      return [{ ...model, http }, cmd.map(subMsg => ({ type: 'Http', subMsg } as Msg), httpCmd)]
    case 'LabeledCheckboxes':
      const [labeledCheckboxes, labeledCheckboxesCmd] = LabeledCheckboxes.update(msg.subMsg, model.labeledCheckboxes)
      return [
        { ...model, labeledCheckboxes },
        cmd.map(subMsg => ({ type: 'LabeledCheckboxes', subMsg } as Msg), labeledCheckboxesCmd)
      ]
    case 'Task':
      const [task, taskCmd] = Task.update(msg.subMsg, model.task)
      return [{ ...model, task }, cmd.map(subMsg => ({ type: 'Task', subMsg } as Msg), taskCmd)]
    case 'LazyTest':
      const [lazyTest, lazyTestCmd] = LazyTest.update(msg.subMsg, model.lazyTest)
      return [{ ...model, lazyTest }, cmd.map(subMsg => ({ type: 'LazyTest', subMsg } as Msg), lazyTestCmd)]
  }
}

export function view(model: Model): Html.Html<Msg> {
  return new Html.Reader(dispatch => (
    <div>
      <h1>Counter</h1>
      {Counter.view(model.counter).run(subMsg => dispatch({ type: 'Counter', subMsg }))}
      <h1>Http</h1>
      {Http.view(model.http).run(subMsg => dispatch({ type: 'Http', subMsg }))}
      <h1>LabeledCheckboxes</h1>
      {LabeledCheckboxes.view(model.labeledCheckboxes).run(subMsg => dispatch({ type: 'LabeledCheckboxes', subMsg }))}
      <h1>Task</h1>
      {Task.view(model.task).run(subMsg => dispatch({ type: 'Task', subMsg }))}
      <h1>Lazy Test</h1>
      {LazyTest.view(model.lazyTest).run(subMsg => dispatch({ type: 'LazyTest', subMsg }))}
    </div>
  ))
}
