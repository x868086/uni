import request from '@/utils/request';

export function getArpu(data) {
  return request({
    url: `/threshold/getarpu`,
    method: 'post',
    data,
  });
}

export function arpuBingo(data) {
  return request({
    url: `/threshold/bingo`,
    method: 'post',
    data,
  });
}

export function thresholdCreate(data) {
  return request({
    url: '/threshold/create',
    method: 'post',
    data,
  });
}
