import build from './app.js';

const app = build({
  logger: { prettyPrint: true },
});

// section Start server
const start = async () =>
{
  try
  {
    await app.listen(process.env.PORT || 5000);
  }
  catch (err)
  {
    app.log.error(err);
    process.exit(1);
  }
};

start();
