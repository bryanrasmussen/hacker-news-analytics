module.exports = {
  apps: [{
    name: 'hackernews-analytics',
    script: 'npm',
    args: 'start',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }],

  deploy: {
    production: {
      user: 'root',
      host: 'cf',
      ref: 'origin/master',
      repo: 'https://github.com/christian-fei/hackernews-analytics.git',
      path: '/root/apps/hackernews-analytics',
      'pre-deploy': 'mkdir -p /root/apps/hackernews-analytics',
      'post-deploy': 'npm install && pm2 stop ecosystem.config.js && sleep 1 && pm2 startOrGracefulReload ecosystem.config.js --env production'
    }
  }
}