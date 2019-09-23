import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Test } from '.'

const app = () => express(apiRoot, routes)

let test

beforeEach(async () => {
  test = await Test.create({})
})

test('POST /tests 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, text: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.text).toEqual('test')
})

test('POST /tests 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /tests 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /tests 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /tests/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${test.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(test.id)
})

test('GET /tests/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${test.id}`)
  expect(status).toBe(401)
})

test('GET /tests/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /tests/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${test.id}`)
    .send({ access_token: masterKey, text: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(test.id)
  expect(body.text).toEqual('test')
})

test('PUT /tests/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${test.id}`)
  expect(status).toBe(401)
})

test('PUT /tests/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, text: 'test' })
  expect(status).toBe(404)
})

test('DELETE /tests/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${test.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /tests/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${test.id}`)
  expect(status).toBe(401)
})

test('DELETE /tests/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
