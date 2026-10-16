import { Box, Icon, Label } from '../../components/WebUI';
import { styles } from '../../theme';

type HomeHeroProps = {
  formattedDate: string;
  formattedTime: string;
  welcomeName: string;
  dailyVerse: string;
  isCompact: boolean;
};

export function HomeHero({
  formattedDate, formattedTime, welcomeName, dailyVerse, isCompact,
}: HomeHeroProps) {
  return (
    <Box className="home-hero" style={styles.hero}>
      <Box className="home-hero-art" aria-hidden="true">
        <Box className="hero-music-note hero-music-note-single" />
        <Box className="hero-music-note hero-music-note-pair" />
      </Box>
      <Box style={styles.homeHeroIdentity}>
        <Box style={styles.homeHeroMark}>
          <Icon name="cross-outline" size={19} color="#ffffff" />
          <Box className="home-brand-music-note" />
        </Box>
        <Label className="responsive-eyebrow" style={styles.homeHeroKicker}>A NEW SEASON OF GRACE</Label>
      </Box>
      <Label style={styles.eyebrow}>
        {formattedDate.toUpperCase()} • {formattedTime}
      </Label>
      <Label className="home-hero-title responsive-section-title" style={[styles.heroTitle, isCompact && styles.mobileHeroTitle]}>
        Welcome, {welcomeName}.{`\n`}Here’s what’s happening.
      </Label>
      <Box className="home-scripture" style={styles.homeScripture}>
        <Icon name="book-outline" size={17} color="#dedede" />
        <Label className="home-scripture-text" style={styles.homeScriptureText}>{dailyVerse}</Label>
      </Box>
    </Box>
  );
}
