import mqtt from 'mqtt';

export class Mqtt {
  DEFAULT = {
    url: 'mqtt://107.170.231.29:9001',
    opts: {}
  }

  constructor(...props) {
    this.url = props.serverUrl || this.DEFAULT.url;
    this.opts = props.connectionOpts || this.DEFAULT.opts;
    this.client = mqtt.connect(this.url, this.opts);
    this.topics = [];
  }

  connect() {
    this.client = mqtt.client(this.url, this.opts)
  }

  end(force = false, cb) {
    this.client.end(force, cb);
  }

  on(event, cb) {
    this.client.on(event, cb);
  }

  publish(topic, message, opts, cb) {
    this.validateTopic(topic);

    this.client.publish(topic, message, opts, cb)
  }

  subscribe(topic, opts, cb) {
    this.client.subscribe(topic, opts, cb);
    this.topics.push(topic);
  }

  unsubscribe(topic, cb) {
    const topicPos = this.validateTopic(topic);

    this.topics.splice(topicPos, 1);
    this.client.unsubscribe(topic, cb);
  }

  validateTopic (topic) {
    const topicPos = this.topics.findIndex(t => t === topic);
    console.log(this.topics);
    if (topicPos === -1) {
      throw new Error('Error: You\'re not subscribe to this topic')
    }

    return topicPos;
  }
}
