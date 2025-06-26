export const RES_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  CONFLICT: 409,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

export const RES_MESSAGE = {
  INTERNAL_ERROR: 'Internal server error',
  EVENT_NOT_FOUND: 'Event not found',
  EDIT_GRANTED: 'Edit permission granted',
  EDIT_CONFLICT: 'Event is being edited by another user',
  EDIT_EXTENDED: 'Edit session extended',
  EDIT_INVALID: 'Edit session invalid',
};

export const AGENDA_JOBS = {
  CHECK_MONGO_CONNECTION: "check mongo connection",
  CHECK_MONGO_CONNECTION_TIME: "1 minute",
  MAIL_SEND_TO_FAILED: "ryoji35997@gmail.com"
};

export const EVENT_CONST = {
  EXPIRE_TIME: 5 * 60000,
}
