import { buildConfig } from 'payload/config';
import path from 'path';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { slateEditor } from '@payloadcms/richtext-slate';
import { Products } from './collections/Products';
import { Users } from './collections/Users';

export default buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Products,
  ],
  editor: slateEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'YOUR_SECRET_KEY',
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/captain-maid',
  }),
});
