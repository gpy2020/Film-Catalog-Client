import * as actionTypes from "./actionTypes";
import axios from "axios";
import { takeLatest, call, put } from "redux-saga/effects";

export function* loadDogWatcher() {
  yield takeLatest(actionTypes.LOAD_DOG_REQUEST, loadDogWorker);
}

function* loadDogWorker() {
  try {
    const response = yield call(loadDog);
    const dog = response.data.message;
    console.log("loaded new dog!");
    console.log(response.data);

    yield put({ type: actionTypes.LOAD_DOG_SUCCESS, dog });
  } catch (error) {
    yield put({ type: actionTypes.LOAD_DOG_FAIL, error });
  }
}

function loadDog() {
  return axios.get("https://dog.ceo/api/breeds/image/random");
}
