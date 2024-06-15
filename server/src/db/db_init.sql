-- Execute SQL when database is created in Docker

-- Create Postgres Types
CREATE TYPE client_contact AS (
    name VARCHAR,
    position VARCHAR,
    phone_number VARCHAR,
    email VARCHAR,
    comments TEXT
);

-- Create Tables
CREATE TABLE clients (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR,
    trading_as VARCHAR,
    abn VARCHAR(11),
    active BOOLEAN,
    address VARCHAR,
    suburb VARCHAR,
    state VARCHAR(3) CHECK(state IN ('QLD', 'NSW', 'TAS', 'ACT', 'VIC', 'WA', 'SA', 'NT')),
    postcode SMALLINT,
    client_contacts client_contact[],
    comments TEXT
);

CREATE TABLE jobs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id uuid NOT NULL,
    job_number SERIAL,
    status VARCHAR NOT NULL CHECK(status IN ('In Progress', 'Awaiting Payment', 'Complete')),
    description TEXT,
    comments TEXT,
    amount_due DECIMAL,
    amount_paid DECIMAL,
    CONSTRAINT fk_client
      FOREIGN KEY(client_id)
        REFERENCES clients(id)
);

-- Insert Placeholder Sample Data (based on mock file)
INSERT INTO clients (
    company_name,
    trading_as,
    abn,
    active,
    address,
    suburb,
    state,
    postcode,
    client_contacts,
    comments
) VALUES (
    'Organisation Pty Ltd',
    'Business Service Consulting',
    '12345678251',
    TRUE,
    '1 Moreton Parade',
    'Petrie',
    'QLD',
    4502,
    ARRAY [
        CAST(('John Snow', 'CEO', '0412 345 789', 'john@organisation.com.au', 'Main point of contact for everything.') AS client_contact),
        CAST(('Other Person', 'COO', '0411 111 111', 'other@organisation.com.au', 'Some other person. Lorem Ipsum is simply dummy text of the printing and typesetting industry.') AS client_contact)
    ],
    'All servers are onsite. Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
), (
    'Business Pty Ltd',
    'Placeholder Resorts',
    '13567827532',
    TRUE,
    '90 Sippy Downs Drive',
    'Sippy Downs',
    'QLD',
    4556,
    ARRAY [
        CAST(('Jimmy McPerson', 'CEO', '0476 543 210', 'jim@business.com.au', NULL) AS client_contact)
    ],
    NULL
), (
    'Not Business Pty Ltd',
    'Not a Business',
    '32165498732',
    FALSE,
    '71 Cartwright Rd',
    'Gympie',
    'QLD',
    4570,
    NULL,
    NULL
);

INSERT INTO jobs (
    client_id,
    status,
    description,
    comments,
    amount_due,
    amount_paid
) VALUES (
    (SELECT id FROM clients LIMIT 1),
    'In Progress',
    'Client asked about stuff. We went to their company and did stuff.',
    NULL,
    0.00,
    0.00
), (
    (SELECT id FROM clients LIMIT 1),
    'Complete',
    'Client asked about stuff. We went to their company and did stuff.',
    'In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before the final copy is available.',
    520.42,
    520.42
), (
    (SELECT id FROM clients LIMIT 1),
    'Awaiting Payment',
    'Client asked about stuff. We went to their company and did stuff.',
    NULL,
    420.56,
    150.00
), (
    (SELECT id FROM clients LIMIT 1),
    'In Progress',
    'Client asked about stuff. We went to their company and did stuff.',
    'Some stuff still to be done on this one.',
    1200.01,
    0.00
), (
    (SELECT id FROM clients LIMIT 1),
    'In Progress',
    'Client asked about stuff. We went to their company and did stuff.',
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    0.00,
    0.00
);