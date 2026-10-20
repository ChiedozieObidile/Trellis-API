import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "../../core/auth/auth.module";
import { DependencyHealthModule } from "../dependency-health.module";
import { DegradedModeController } from "./degraded-mode.controller";
import { DependencyDegradedModeService } from "./degraded-mode.service";

/**
 * Degraded-mode behaviour derived from dependency health (issue #355).
 *
 * Depends on `DependencyHealthModule` for the report. Other modules can inject
 * `DependencyDegradedModeService` and call `assertCapabilityEnabled()` to guard
 * a capability without duplicating the policy.
 */
@Module({
  imports: [ConfigModule, AuthModule, DependencyHealthModule],
  controllers: [DegradedModeController],
  providers: [DependencyDegradedModeService],
  exports: [DependencyDegradedModeService],
})
export class DegradedModeModule {}
