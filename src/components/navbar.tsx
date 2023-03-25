import { useState } from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack, rem, Image } from '@mantine/core';
import {
  IconHome2,
  IconHeart,
  IconSearch,
  IconStar
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';


const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

interface NavbarLinkProps {
  icon: React.FC<any>;
  label: string;
  path: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
        <Icon size="1.2rem" stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Home', path: '/'},
  { icon: IconHeart, label: 'Movies you liked', path: '/likes' },
  { icon: IconSearch, label: 'Search movies', path: '/search' },
  { icon: IconStar, label: 'Best movies', path: 'stars'}
];

export function NavbarMinimal() {

  let navigate = useNavigate(); 
  const routeChange = (index: number, path: string) => { 
    setActive(index)
    navigate(path);

  }

  const [active, setActive] = useState(2);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => routeChange(index, link.path)}
    />
  ));

  return (
    <Navbar width={{ base: 80 }} p="md">
      <Center>
        <Image maw={30} src="./logo.png" alt="Logo" />
      </Center>
      <Navbar.Section grow mt={30}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}