import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import path from 'path';
import { fileURLToPath } from 'url';

// Payload CMS collections removed — using Supabase instead
// import { Users } from './collections/Users';
// import { Products } from './collections/Products';
// import { BlogPosts } from './collections/BlogPosts';
// import { Contacts } from './collections/Contacts';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: 'users',
  },
  collections: [
    // Collections moved to Supabase — see src/lib/supabase/schema.sql
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'supersecretfallbacksecretthirtytwocarslong',
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: true, // automatically sync schema changes to Postgres/Supabase
  }),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
});
