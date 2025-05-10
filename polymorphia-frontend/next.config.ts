/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: '/knowledge-base',
        destination: '/knowledge-base/evolution-stages/',
        permanent: true,
      },
    ]
  },
}