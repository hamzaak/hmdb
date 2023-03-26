import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar, Center, UnstyledButton, createStyles, Stack, rem, Image } from '@mantine/core';
import { AiOutlineHome, AiOutlineHeart, AiOutlineSearch, AiOutlineStar } from 'react-icons/ai';
import { BiMoviePlay } from 'react-icons/bi';
import { BsCalendar2Date, BsFire } from 'react-icons/bs';

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
  path: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, active, onClick }: NavbarLinkProps) {
  const { classes, cx } = useStyles();
  return (
    <UnstyledButton onClick={onClick} className={cx(classes.link, { [classes.active]: active })}>
      <Icon size="1.2rem" stroke={1.5} />
    </UnstyledButton>
  );
}

const mockdata = [
  { icon: AiOutlineHome, path: ''},
  { icon: AiOutlineHeart, path: 'likes' },
  { icon: AiOutlineSearch, path: 'search' },
  { icon: BiMoviePlay, path: 'now_playing' },
  { icon: BsCalendar2Date, path: 'upcoming' },
  { icon: BsFire, path: 'popular' },
  { icon: AiOutlineStar, path: 'top_rated'}
];

export function NavbarMinimal() {
  
  let navigate = useNavigate();
  const location = useLocation();
  let currentIndex = 0;
  if(location.pathname.startsWith('/top_rated')) {
    currentIndex = 6;
  } else if (location.pathname.startsWith('/popular')) {
    currentIndex = 5;
  } else if (location.pathname.startsWith('/upcoming')) {
    currentIndex = 4;
  } else if (location.pathname.startsWith('/now_playing')) {
    currentIndex = 3;
  } else if (location.pathname.startsWith('/search')) {
    currentIndex = 2;
  } else if (location.pathname.startsWith('/likes')) {
    currentIndex = 1;
  }

  const routeChange = (index: number, path: string) => { 
    setActive(index)
    navigate(path);
  }

  const [active, setActive] = useState(currentIndex);

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.path}
      active={index === active}
      onClick={() => routeChange(index, link.path)}
    />
  ));

  return (
    <Navbar width={{ base: 80 }} p="md" style={{backgroundColor: 'black'}}>
      <Center>
        <Image maw={30} src="./logo.png" alt="Logo" />
      </Center>
      <Navbar.Section grow mt={30}>
        <Stack justify="center" spacing={5}>
          {links}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}