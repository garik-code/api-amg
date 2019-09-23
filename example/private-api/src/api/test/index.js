import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Test, { schema } from './model'

const router = new Router()
const { text } = schema.tree

/**
 * @api {post} /tests Create test
 * @apiName CreateTest
 * @apiGroup Test
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam text Test's text.
 * @apiSuccess {Object} test Test's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Test not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ text }),
  create)

/**
 * @api {get} /tests Retrieve tests
 * @apiName RetrieveTests
 * @apiGroup Test
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of tests.
 * @apiSuccess {Object[]} rows List of tests.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /tests/:id Retrieve test
 * @apiName RetrieveTest
 * @apiGroup Test
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} test Test's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Test not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /tests/:id Update test
 * @apiName UpdateTest
 * @apiGroup Test
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam text Test's text.
 * @apiSuccess {Object} test Test's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Test not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ text }),
  update)

/**
 * @api {delete} /tests/:id Delete test
 * @apiName DeleteTest
 * @apiGroup Test
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Test not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
